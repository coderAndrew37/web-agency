import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../services/authService";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
  VerifyData,
} from "../types/authTypes";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasCheckedAuth: boolean;
};

type LoginParams =
  | { type: "credentials"; data: LoginData }
  | { type: "refresh"; user: User };

type AuthActions = {
  login: (params: LoginParams) => Promise<void>;
  register: (data: RegisterData) => Promise<{ email: string }>;
  verify: (data: VerifyData) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: (force?: boolean) => Promise<void>;
  clearError: () => void;
  getUser: () => User | null;
  resetAuthState: () => void;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, data: { password: string }) => Promise<void>;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  hasCheckedAuth: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: async (params) => {
        set({ isLoading: true, error: null });

        try {
          let user: User | null;
          let isAuthenticated: boolean;

          if (params.type === "credentials") {
            const response = await AuthService.login(params.data);
            user = response.user;
            isAuthenticated = response.isAuthenticated;
          } else {
            user = params.user;
            isAuthenticated = true;
          }

          if (!user) {
            throw new Error("Authentication failed - no user returned");
          }

          set({
            user,
            isAuthenticated,
            isLoading: false,
            hasCheckedAuth: true,
          });
        } catch (error) {
          set({
            error: getErrorMessage(
              error,
              params.type === "credentials"
                ? "Login failed"
                : "Session refresh failed"
            ),
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.register(data);
          set({ isLoading: false });
          return { email: data.email };
        } catch (error) {
          set({
            error: getErrorMessage(error, "Registration failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      verify: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const response = await AuthService.verify(data);

          if (!response.user) {
            throw new Error("Verification failed - no user returned");
          }

          set({
            user: response.user,
            isAuthenticated: response.isAuthenticated,
            isLoading: false,
            hasCheckedAuth: true,
          });

          return response;
        } catch (error) {
          set({
            error: getErrorMessage(error, "Verification failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      resendVerification: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.resendVerification(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: getErrorMessage(error, "Resend verification failed"),
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthService.logout();
          set({ ...initialState });
        } catch (error) {
          set({
            error: getErrorMessage(error, "Logout failed"),
            isLoading: false,
          });
        }
      },

      checkAuth: async (force = false) => {
        if (get().hasCheckedAuth && !force) return;

        set({ isLoading: true });
        try {
          const { isAuthenticated, user } = await AuthService.checkAuth();

          set({
            user,
            isAuthenticated,
            isLoading: false,
            hasCheckedAuth: true,
          });
        } catch (error) {
          set({
            isLoading: false,
            hasCheckedAuth: true,
            error: getErrorMessage(error, "Auth check failed"),
          });
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const res = await AuthService.forgotPassword({ email });
          set({ isLoading: false });
          return res.message;
        } catch (error) {
          const msg = getErrorMessage(error, "Failed to send reset email");
          set({ isLoading: false, error: msg });
          throw new Error(msg);
        }
      },

      resetPassword: async (token, data) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.resetPassword(token, data);
          set({ isLoading: false });
        } catch (error) {
          const msg = getErrorMessage(error, "Password reset failed");
          set({ isLoading: false, error: msg });
          throw new Error(msg);
        }
      },

      clearError: () => set({ error: null }),

      resetAuthState: () =>
        set({
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }),

      getUser: () => get().user,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      migrate: (persistedState, version) => {
        if (version === 0) {
          return {
            ...(typeof persistedState === "object" && persistedState !== null
              ? persistedState
              : {}),
            hasCheckedAuth: false,
          };
        }
        return persistedState;
      },
      version: 1,
    }
  )
);
