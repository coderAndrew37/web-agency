// src/services/authService.ts
import { apiClient } from "../api/httpClient";
import {
  AuthResponse,
  LoginData,
  RefreshTokenResponse,
  RegisterData,
  User,
  VerifyData,
  BaseApiResponse,
} from "../types/authTypes";

function handleCsrfToken(csrfToken?: string | null) {
  if (csrfToken) {
    apiClient.setCsrfToken(csrfToken);
  }
}

export const AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);

    console.log("Login response:", response);

    if (!response?.user) {
      throw new Error("Authentication failed - invalid response");
    }

    handleCsrfToken(response.csrfToken);
    return response;
  },

  async register(data: RegisterData): Promise<{ email: string }> {
    await apiClient.post("/auth/register", data);
    return { email: data.email };
  },

  async verify(data: VerifyData): Promise<AuthResponse> {
    const response = await apiClient.post<{
      data: AuthResponse;
      csrfToken?: string;
    }>("/auth/verify", data);
    const raw = response.data;

    if (!raw?.user) {
      throw new Error("Invalid response from /auth/verify");
    }

    handleCsrfToken(response.data.csrfToken);
    return raw;
  },

  async resendVerification(email: string): Promise<void> {
    if (!email) {
      throw new Error("Email is required to resend verification");
    }
    console.log("[AuthService] Sending resend-verification with:", { email });
    await apiClient.post("/auth/resend-verification", { email });
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    apiClient.clearCsrfToken();
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<BaseApiResponse<AuthResponse>>(
        "/auth/me"
      );
      return response.data.data?.user || null;
    } catch {
      return null;
    }
  },

  async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      "/auth/forgot-password",
      data
    );
    return response;
  },

  async resetPassword(
    token: string,
    data: { password: string }
  ): Promise<void> {
    await apiClient.post(`/auth/reset-password/${token}`, data);
  },

  async refresh(): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>(
        "/auth/refresh"
      );

      if (!response) {
        return { accessToken: null, csrfToken: null };
      }

      handleCsrfToken(response.csrfToken);
      return {
        accessToken: response.accessToken,
        csrfToken: response.csrfToken,
        user: response.user,
      };
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as { response?: { status?: number } }).response?.status === 401
      ) {
        return { accessToken: null, csrfToken: null };
      }
      throw error;
    }
  },

  async checkAuth(): Promise<{ isAuthenticated: boolean; user?: User | null }> {
    try {
      const refreshResponse = await this.refresh();

      if (!refreshResponse.accessToken) {
        return { isAuthenticated: false };
      }

      const user = await this.getCurrentUser();
      return {
        isAuthenticated: !!user,
        user: user || undefined,
      };
    } catch {
      return { isAuthenticated: false };
    }
  },
};
