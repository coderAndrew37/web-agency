import { useNavbarStore } from "../../store/uiStore";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../auth/useLogout";

export const useNavbar = () => {
  const isOpen = useNavbarStore((state) => state.isOpen);
  const isServicesOpen = useNavbarStore((state) => state.isServicesOpen);
  const toggleNav = useNavbarStore((state) => state.toggleNav);
  const toggleServices = useNavbarStore((state) => state.toggleServices);

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
