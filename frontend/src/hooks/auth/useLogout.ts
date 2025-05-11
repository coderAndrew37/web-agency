import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return {
    logout: async () => {
      try {
        await logout();
        localStorage.removeItem("auth-storage"); // Zustand persist key
        navigate("/"); // redirect user to home page
        window.location.reload(); // reload the page to clear any cached data
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  };
};
