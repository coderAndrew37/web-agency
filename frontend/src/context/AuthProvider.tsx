import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { AuthContext, type User } from "./AuthContext";
import { useState, useCallback } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check auth only when needed (not on page load)
  const checkAuthState = useCallback(async (): Promise<void> => {
    if (user) return; // ✅ Skip if user is already set

    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get<User>("/auth/me");
      setUser(data);
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error("Auth check failed", error);
      }
      setUser(null); // ✅ Keep user anonymous by default
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/login", credentials, {
        withCredentials: true,
      });
      await checkAuthState(); // ✅ Ensure user state is updated
    } catch (err) {
      setError("Invalid email or password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout properly");
    } finally {
      setIsLoading(false);
      window.location.href = "/"; // ✅ Ensure session is cleared
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        error,
        login,
        logout,
        checkAuth: checkAuthState, // ✅ Expose auth check for protected routes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
