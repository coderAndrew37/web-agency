// hooks/useAuthForm.ts
import { useAuthStore } from "../../store/authStore";

export const useAuthForm = () => {
  return useAuthStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login: state.login,
    register: state.register,
    clearError: state.clearError,
  }));
};
