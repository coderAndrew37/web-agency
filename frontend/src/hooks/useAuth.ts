// hooks/auth/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/authService";
import { LoginData, RegisterData } from "../types/authTypes";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: (data: LoginData) => AuthService.login(data),
    onSuccess: (user) => {
      setUser(user);
    },
  });
};

export const useRegister = () => {
  const { mutateAsync: login } = useLogin();

  return useMutation({
    mutationFn: (data: RegisterData) => AuthService.register(data),
    onSuccess: (_, variables) => {
      return login({
        email: variables.email,
        password: variables.password,
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => AuthService.getCurrentUser(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useLogout = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      setUser(null);
    },
  });
};
