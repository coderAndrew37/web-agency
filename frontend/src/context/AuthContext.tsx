// context/authContext.ts
import { createContext } from "react";
import { User } from "../types/authTypes";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
