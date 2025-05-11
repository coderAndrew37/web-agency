import { apiClient } from "../api/httpClient";
import {
  AuthResponse,
  LoginData,
  RefreshTokenResponse,
  RegisterData,
  User,
  VerifyData,
} from "../types/authTypes";

// Handles fallback errors from axios
type ApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
};

function handleCsrfToken(csrfToken?: string | null) {
  if (csrfToken) {
    apiClient.setCsrfToken(csrfToken);
  }
}

export const AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    handleCsrfToken(response.csrfToken);
    return response;
  },

  async register(data: RegisterData): Promise<void> {
    await apiClient.post<void>("/auth/register", data);
  },

  async verify(data: VerifyData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/verify", data);
    handleCsrfToken(response.csrfToken);
    return response;
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post<void>("/auth/resend-verification", { email });
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    apiClient.clearCsrfToken();
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/me");
  },

  async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>("/auth/forgot-password", data);
  },

  async resetPassword(
    token: string,
    data: { password: string }
  ): Promise<void> {
    await apiClient.post(`/auth/reset-password/${token}`, data);
  },

  async refresh(): Promise<RefreshTokenResponse> {
    const response = await apiClient
      .post<RefreshTokenResponse>("/auth/refresh")
      .catch((error) => {
        const apiError = error as ApiError;
        if (apiError.response?.status === 404) {
          return { accessToken: null, csrfToken: null };
        }
        throw error;
      });

    handleCsrfToken(response.csrfToken);
    return response;
  },

  async checkAuth(): Promise<{ isAuthenticated: boolean; user?: User }> {
    const response = await this.refresh();
    if (response.csrfToken) {
      const user = await this.getCurrentUser();
      return { isAuthenticated: true, user };
    }
    return { isAuthenticated: false };
  },
};
