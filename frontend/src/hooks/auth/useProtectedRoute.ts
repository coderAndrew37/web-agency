import { useIsAuthenticated, useAuthLoading } from "./useAuth";

export const useProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();

  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated,
  };
};
