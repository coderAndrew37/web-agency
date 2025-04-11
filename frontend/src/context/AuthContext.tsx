// context/authContext.ts
import { createContext } from "react";
import { User } from "../types/authTypes";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
