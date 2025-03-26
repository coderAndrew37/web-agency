import axios from "axios";
import { queryClient } from "./queryClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Track active requests to prevent duplicates
const activeRequests = new Set();

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests.delete(response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    activeRequests.delete(originalRequest.url);

    // Network error handling
    if (error.code === "ERR_NETWORK") {
      console.error("Network error - please check your connection");
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent multiple concurrent refresh attempts
      if (activeRequests.has("/auth/refresh-token")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      activeRequests.add("/auth/refresh-token");

      try {
        await axiosInstance.post("/auth/refresh-token");
        activeRequests.delete("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        activeRequests.delete("/auth/refresh-token");

        // Clean up auth state
        try {
          await axiosInstance.post("/auth/logout");
        } catch (logoutError) {
          console.error("Logout failed:", logoutError);
        }

        // Clear client-side state
        queryClient.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
