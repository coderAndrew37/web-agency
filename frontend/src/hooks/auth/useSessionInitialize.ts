// hooks/auth/useSessionInitialize.ts
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

export const useSessionInitialize = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array to run only once on mount
};
