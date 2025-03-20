import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // ✅ Correct type

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data); // ✅ Set user state correctly
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache auth state for 5 mins
    refetchOnReconnect: true, // ✅ Auto-refetch on network recovery
  });

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null); // ✅ Clear user on logout
    refetch(); // ✅ Clear cache & trigger re-fetch
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading: isLoading, refetch, logout }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
