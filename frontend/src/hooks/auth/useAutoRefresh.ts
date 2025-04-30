import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useAuthActions } from "./useAuthActions";

export const useAutoRefresh = (interval = 10 * 60 * 1000) => {
  const { isAuthenticated } = useAuthStore();
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(checkAuth, interval);
    return () => clearInterval(timer);
  }, [isAuthenticated, checkAuth, interval]);
};
