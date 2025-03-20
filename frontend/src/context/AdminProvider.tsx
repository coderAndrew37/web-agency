import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminContext } from "./AdminContext";
import axiosInstance from "../api/axiosInstance";

interface AdminStats {
  users: number;
  testimonials: number;
  subscribers: number;
  contactMessages: number;
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async (): Promise<AdminStats> => {
      const { data } = await axiosInstance.get("/admin/stats");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: true,
  });

  return (
    <AdminContext.Provider
      value={{ stats: data || null, loading: isLoading, refetch }}
    >
      {!isLoading && children}
    </AdminContext.Provider>
  );
};
