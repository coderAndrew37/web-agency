import { useAuthStore } from "../../store/authStore";

export const useAuthForm = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const clearError = useAuthStore((state) => state.clearError);

  return { user, isLoading, error, login, register, clearError };
};

export default useAuthForm;
