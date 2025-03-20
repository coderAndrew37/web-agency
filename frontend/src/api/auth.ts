import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// ✅ Register User
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      password: string;
    }) => {
      return axiosInstance.post("/auth/register", userData);
    },
  });
};

// ✅ Login User
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      return axiosInstance.post("/auth/login", loginData);
    },
  });
};

// ✅ Logout User
export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => axiosInstance.post("/auth/logout"),
  });
};

//Reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (resetData: { token: string; password: string }) => {
      return axiosInstance.post("/auth/reset-password", resetData);
    },
  });
};

//Forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (forgotData: { email: string }) => {
      return axiosInstance.post("/auth/forgot-password", forgotData);
    },
  });
};
