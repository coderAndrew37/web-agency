import { useState, useEffect, ReactNode } from "react";
import { AdminContext } from "./AdminContext";
import axiosInstance from "../api/axiosInstance";

interface AdminStats {
  users: number;
  testimonials: number;
  subscribers: number;
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<AdminStats>({
    users: 0,
    testimonials: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <AdminContext.Provider value={{ stats, setStats, loading }}>
      {!loading && children}
    </AdminContext.Provider>
  );
};
