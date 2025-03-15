import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Axios Instance with Interceptors
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Important for sending cookies
});

// ✅ Handle Expired Tokens Automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // ✅ Request a new access token using refresh token
        await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest); // Retry the original request
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }
    return Promise.reject(error);
  }
);

// ✅ Register API
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/register", userData);
};

// ✅ Login API
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/login", loginData);
};

// ✅ Logout API (Clears Cookies)
export const logoutUser = async () => {
  return axiosInstance.post("/auth/logout");
};

export default axiosInstance;
