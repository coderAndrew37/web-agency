import { apiClient } from "../api/httpClient";
import {
  LoginData,
  RegisterData,
  VerifyData,
  User,
  AuthResponse,
  RefreshTokenResponse,
} from "../types/authTypes";

export const AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    if (response.csrfToken) {
      apiClient.setCsrfToken(response.csrfToken);
    }
    return response;
  },

  async register(data: RegisterData): Promise<void> {
    await apiClient.post<void>("/auth/register", data);
  },

  async verify(data: VerifyData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/verify", data);
    if (response.csrfToken) {
      apiClient.setCsrfToken(response.csrfToken);
    }
    return response;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      apiClient.clearCsrfToken();
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/me");
  },

  async refresh(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      "/auth/refresh"
    );
    if (response.csrfToken) {
      apiClient.setCsrfToken(response.csrfToken);
    }
    return response;
  },

  // Utility method to check auth state
  async checkAuth(): Promise<{ isAuthenticated: boolean; user?: User }> {
    try {
      const user = await this.getCurrentUser();
      return { isAuthenticated: true, user };
    } catch {
      try {
        const { accessToken } = await this.refresh();
        if (accessToken) {
          const user = await this.getCurrentUser();
          return { isAuthenticated: true, user };
        }
      } catch {
        return { isAuthenticated: false };
      }
    }
    return { isAuthenticated: false };
  },
};
