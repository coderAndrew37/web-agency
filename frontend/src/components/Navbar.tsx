import { useEffect, useState } from "react";
import { useNavbar } from "../hooks/ui/useNavBar";
import { useCalendly } from "../hooks/integrations/useCalendly";
import { calendlyUrl } from "../config/constants";
import { Menu, X } from "lucide-react";
import DesktopMenu from "./Navbar/DesktopMenu";
import MobileMenu from "./Navbar/MobileMenu";
import Logo from "./Navbar/Logo";
import colors from "../styles/colors";

const Navbar = () => {
  const { isOpen, setIsOpen } = useNavbar();
  const { openCalendly } = useCalendly();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 md:py-6 px-6">
        <Logo />
        <DesktopMenu openCalendly={() => openCalendly(calendlyUrl)} />
        <button
          className="md:hidden"
          onClick={() => setIsOpen()}
          style={{ color: colors.darkText }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <MobileMenu isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
