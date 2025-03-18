import { createContext } from "react";

interface AdminStats {
  users: number;
  testimonials: number;
  subscribers: number;
}

interface AdminContextType {
  stats: AdminStats;
  setStats: (stats: AdminStats) => void;
  loading: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);
