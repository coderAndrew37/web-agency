import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Important for sending cookies
});

// ✅ Handle Expired Tokens Automatically
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
      const isAuthenticated = !!document.cookie.includes("accessToken"); // Check if the user is authenticated
      if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page or show a modal
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear invalid tokens and redirect to login
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login"; // Redirect to login page

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
