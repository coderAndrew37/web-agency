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
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function handleCsrfToken(csrfToken?: string | null) {
  if (csrfToken) {
    apiClient.setCsrfToken(csrfToken);
  }
}

export const AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);

    if (!response?.data || !response.data.user) {
      throw new Error("Invalid response from /auth/login");
    }

    handleCsrfToken(response.csrfToken);
    return response.data;
  },
  async register(data: RegisterData): Promise<void> {
    await apiClient.post<void>("/auth/register", data);
  },

  async verify(data: VerifyData): Promise<AuthResponse> {
    const { csrfToken, data: payload } = await apiClient.post<AuthResponse>(
      "/auth/verify",
      data
    );
    handleCsrfToken(csrfToken);
    return payload;
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post<void>("/auth/resend-verification", { email });
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    apiClient.clearCsrfToken();
  },

  async getCurrentUser(): Promise<User> {
    // return apiClient.get<User>("/auth/me");
    const { data: payload } = await apiClient.get<User>("/auth/me");
    return payload;
  },

  async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    const { data: payload } = await apiClient.post<{ message: string }>(
      "/auth/forgot-password",
      data
    );
    return payload;
  },
  async resetPassword(
    token: string,
    data: { password: string }
  ): Promise<void> {
    await apiClient.post(`/auth/reset-password/${token}`, data);
  },

  async refresh(): Promise<RefreshTokenResponse> {
    try {
      const { csrfToken, data: payload } =
        await apiClient.post<RefreshTokenResponse>("/auth/refresh");
      handleCsrfToken(csrfToken);
      return payload;
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 404) {
        return { accessToken: null, csrfToken: null };
      }
      throw error;
    }
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
