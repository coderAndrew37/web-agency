import { useNavbarStore } from "../../store/uiStore";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../auth/useLogout";

export const useNavbar = () => {
  const { isOpen, isServicesOpen, toggleNav, toggleServices } =
    useNavbarStore();
  const user = useAuthStore((state) => state.user);
  const { logout } = useLogout();

  return {
    user,
    isOpen,
    isServicesOpen,
    setIsOpen: toggleNav,
    setIsServicesOpen: toggleServices,
    logout,
  };
};
