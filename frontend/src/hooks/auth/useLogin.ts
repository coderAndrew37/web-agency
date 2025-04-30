import { useState } from "react";
import { useAuthActions } from "./useAuthActions";
import { LoginData } from "../../types/authTypes";

export const useLogin = () => {
  const { login } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (credentials: LoginData) => {
    setIsSubmitting(true);
    try {
      await login(credentials);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleLogin,
    isSubmitting,
  };
};
