import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // ✅ Restore user from localStorage on first load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthCheckNeeded, setIsAuthCheckNeeded] = useState(false);

  // ✅ Only check auth if session cookies exist
  useEffect(() => {
    const hasSession = document.cookie.includes("accessToken"); // ✅ Check session
    setIsAuthCheckNeeded(hasSession);
  }, []);

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      if (!isAuthCheckNeeded) return null; // ✅ Skip request if no session
      try {
        const { data } = await axiosInstance.get("/auth/me", {
          withCredentials: true,
        });
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // ✅ Store user persistently
        return data;
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user"); // ✅ Clear storage if session expired
        throw error;
      }
    },
    enabled: isAuthCheckNeeded, // ✅ Prevents unnecessary requests
    staleTime: 30 * 60 * 1000, // ✅ Keep session for 30 minutes
    retry: false, // ✅ Avoid unnecessary retries
  });

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
    localStorage.removeItem("user"); // ✅ Clear user from storage
    refetch(); // ✅ Re-check session
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading: isLoading, refetch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
