import { apiClient } from "../api/httpClient";
import { LoginData, RegisterData, User } from "../types/authTypes";

export const AuthService = {
  login: async (data: LoginData): Promise<User> => {
    return apiClient.post<User, LoginData>("/auth/login", data);
  },

  register: async (data: RegisterData): Promise<void> => {
    return apiClient.post<void, RegisterData>("/auth/register", data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },
};
