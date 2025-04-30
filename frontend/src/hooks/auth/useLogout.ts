import { useAuthActions } from "./useAuthActions";

export const useLogout = () => {
  const { logout } = useAuthActions();

  return {
    logout,
    handleLogout: async () => {
      await logout();
      window.location.reload(); // Clear all client state
    },
  };
};
