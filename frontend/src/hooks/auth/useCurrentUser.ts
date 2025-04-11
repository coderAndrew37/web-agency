// hooks/auth/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../services/authService";
import { User } from "../../types/authTypes";

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: AuthService.getCurrentUser,
    retry: false,
  });
};
