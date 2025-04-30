import { useAuthStore } from "../../store/authStore";
import { useAuthActions } from "./useAuthActions";

// Selector hooks for optimized rerenders
export const useCurrentUser = () => useAuthStore((state) => state.user);

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

export const useAuthError = () => useAuthStore((state) => state.error);

// Compound hook for common auth needs
export const useAuth = () => ({
  user: useCurrentUser(),
  isAuthenticated: useIsAuthenticated(),
  isLoading: useAuthLoading(),
  error: useAuthError(),
  ...useAuthActions(),
});
