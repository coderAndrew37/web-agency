import { apiClient } from "../api/httpClient";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from "../types/authTypes";

export const AuthService = {
  login: async (data: LoginData): Promise<User> => {
    const res = await apiClient.post<AuthResponse, LoginData>(
      "/auth/login",
      data
    );
    return res.user;
  },
  register: async (data: RegisterData): Promise<void> => {
    return apiClient.post<void, RegisterData>("/auth/register", data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void, void>("/auth/logout", undefined); // must provide `data`
  },
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },

  refresh: async (): Promise<void> => {
    return apiClient.post<void, void>("/auth/refresh", undefined); // fix: supply 2 args
  },
};
