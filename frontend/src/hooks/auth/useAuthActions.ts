import { useAuthStore } from "../../store/authStore";

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    register: state.register,
    verify: state.verify,
    checkAuth: state.checkAuth,
    clearError: state.clearError,
  }));
