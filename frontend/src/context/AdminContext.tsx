import { createContext } from "react";

interface AdminStats {
  users: number;
  testimonials: number;
  subscribers: number;
  contactMessages: number; // ✅ Add Contact Messages Count
}

interface AdminContextType {
  stats: AdminStats;
  setStats: React.Dispatch<React.SetStateAction<AdminStats>>; // ✅ Update setStats type
  loading: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);
