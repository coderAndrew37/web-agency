import axiosInstance from "./axiosInstance";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/register", userData);
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/login", loginData);
};

export const logoutUser = async () => {
  return axiosInstance.post("/auth/logout");
};

export const forgotPassword = (data: { email: string }) => {
  return axiosInstance.post("/password/forgot-password", data);
};

export const resetPassword = (token: string, data: { password: string }) => {
  return axiosInstance.post(`/password/reset-password/${token}`, data);
};
