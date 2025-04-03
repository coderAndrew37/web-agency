import axios from "axios";
import { queryClient } from "./queryClient";
import { User } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Ensure cookies are always sent
  headers: { "Content-Type": "application/json" },
});

// ✅ Prevent refresh spam for anonymous users
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const user = queryClient.getQueryData<User | null>(["user"]);

      if (!user) {
        return Promise.reject(error); // ✅ Skip refresh if user is anonymous
      }

      originalRequest._retry = true;
      try {
        await axiosInstance.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest); // ✅ Retry original request
      } catch (refreshError) {
        queryClient.clear();
        window.location.href = "/login"; // ✅ Force login for expired session
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
