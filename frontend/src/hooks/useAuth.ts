// hooks/auth/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/authService";
import { LoginData, RegisterData, User } from "../types/authTypes";
import { useAuthContext } from "./useAuthContext";

// 🔐 Internal reusable logic for login
const useAuthInternal = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => AuthService.login(data),
    onSuccess: (user) => {
      setUser(user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      setUser(null);
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    loginMutation,
    logoutMutation,
    setUser,
  };
};

// 🔓 Login Hook
export const useLogin = () => {
  const { loginMutation } = useAuthInternal();
  return {
    login: loginMutation.mutateAsync,
    loading: loginMutation.isPending,
    error: loginMutation.error as Error | null,
  };
};

// ✍️ Register Hook (with auto-login)
export const useRegister = () => {
  const { loginMutation } = useAuthInternal();

  return useMutation({
    mutationFn: (data: RegisterData) => AuthService.register(data),
    onSuccess: async (_, variables) => {
      await loginMutation.mutateAsync({
        email: variables.email,
        password: variables.password,
      });
    },
  });
};

// 👤 Fetch Current User
export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: AuthService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// 🚪 Logout Hook
export const useLogout = () => {
  const { setUser } = useAuthContext();

  const mutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      setUser(null);
    },
  });

  return mutation; // 👈 return the full mutation object (has mutate, status, etc.)
};
