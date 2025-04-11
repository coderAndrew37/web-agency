// context/AuthProvider.tsx
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import { User } from "../types/authTypes";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  const setUser = (user: User | null) => {
    queryClient.setQueryData(["currentUser"], user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
