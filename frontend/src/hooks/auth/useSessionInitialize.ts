import { useEffect } from "react";
import { useAuthActions } from "./useAuthActions";

export const useSessionInitialize = () => {
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
};
