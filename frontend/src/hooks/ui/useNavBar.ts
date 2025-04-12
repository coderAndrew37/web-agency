// hooks/ui/useNavbar.ts
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuthContext } from "../useAuthContext";
import { useLogout } from "../useAuth";

gsap.registerPlugin(ScrollTrigger);

export const useNavbar = () => {
  const { user } = useAuthContext();
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    gsap.to(".navbar", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px top",
        scrub: true,
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "12px 0",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    });
  }, []);

  return {
    user,
    logout,
    isOpen,
    isServicesOpen,
    setIsOpen,
    setIsServicesOpen,
  };
};
