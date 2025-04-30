import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../services/authService";
import { User, LoginData, RegisterData, VerifyData } from "../types/authTypes";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verify: (data: VerifyData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Login action
      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = await AuthService.login(data);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Registration action
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.register(data);
          set({ isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // OTP Verification action
      verify: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = await AuthService.verify(data);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Verification failed",
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthService.logout();
          set({ ...initialState });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Logout failed",
            isLoading: false,
          });
        }
      },

      // Check authentication state
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { isAuthenticated, user } = await AuthService.checkAuth();
          set({
            user: user || null,
            isAuthenticated,
            isLoading: false,
          });
        } catch {
          set({ ...initialState, isLoading: false });
        }
      },

      // Clear errors
      clearError: () => set({ error: null }),

      // Example usage of `get`
      getUser: () => get().user,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
