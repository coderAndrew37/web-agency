import { useAuthStore } from "../../store/authStore";

export const useAuthForm = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const verify = useAuthStore((state) => state.verify);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const resendVerification = useAuthStore((state) => state.resendVerification);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    clearError,
    verify,
    forgotPassword,
    resetPassword,
    resendVerification,
  };
};

export default useAuthForm;
