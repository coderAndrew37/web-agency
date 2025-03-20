import { createContext } from "react";

interface AdminStats {
  users: number;
  testimonials: number;
  subscribers: number;
  contactMessages: number; // ✅ Add Contact Messages Count
}

interface AdminContextType {
  stats: AdminStats | null; // ✅ Allow null for loading state
  loading: boolean;
  refetch: () => void; // ✅ Add refetch for manual refresh
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);
