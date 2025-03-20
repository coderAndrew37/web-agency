import axios from "axios";
import { queryClient } from "./queryClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Send cookies & authentication
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor: Handle Expired Tokens Automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (error.code === "ERR_NETWORK") {
      console.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors (only for authenticated users)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axiosInstance.post("/auth/refresh-token");

        // ✅ After refreshing, retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // ✅ Ensure logout API is called to clear HttpOnly cookies
        try {
          await axiosInstance.post("/auth/logout");
        } catch (logoutError) {
          console.error("Logout API failed:", logoutError);
        }

        // ✅ Clear non-HttpOnly cookies (if any exist)
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // ✅ Reset auth state & redirect after cleanup
        queryClient.invalidateQueries({ queryKey: ["auth"] }); // Clear cached auth data
        setTimeout(() => {
          window.location.href = "/login"; // ✅ Redirect after clearing state
        }, 100); // Small delay to ensure state resets

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
