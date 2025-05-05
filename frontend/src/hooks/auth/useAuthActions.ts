import { useAuthStore } from "../../store/authStore";

export const useAuthActions = () => {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const register = useAuthStore((s) => s.register);
  const verify = useAuthStore((s) => s.verify);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const clearError = useAuthStore((s) => s.clearError);

  return { login, logout, register, verify, checkAuth, clearError };
};
