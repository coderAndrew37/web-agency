import ms from "ms";
import { useEffect } from "react";
import { AuthService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

export const useAutoRefresh = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await AuthService.refresh();
        if (response.csrfToken) {
          // Only update if we got a valid response
          const user = await AuthService.getCurrentUser();
          login({ type: "refresh", user });
        }
      } catch (error) {
        if (
          (error as { response?: { status?: number } }).response?.status !== 404
        ) {
          console.error("Token refresh failed:", error);
        }
        // Silently ignore 404 errors (endpoint not available)
      }
    }, ms("15m")); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated, user, login]);
};
