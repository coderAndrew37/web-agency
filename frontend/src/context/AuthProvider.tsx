import axiosInstance from "../api/axiosInstance";
import { AuthContext, type User } from "./AuthContext";
import { FullPageSkeleton } from "../components/FullPageSkeleton";
import { useState, useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Centralized auth state check
  const checkAuthState = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Skip auth check if no cookies exist
      if (!document.cookie.includes("accessToken")) {
        setUser(null);
        return;
      }
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data);
      setError(null);
    } catch {
      setUser(null);
      setError("Session expired - please login again");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/login", credentials);
      await checkAuthState(); // Verify the login was successful
    } catch (err) {
      setError("Invalid email or password");
      throw err; // Re-throw for form handling
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/logout");
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout properly");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
