import { useNavbar } from "../hooks/ui/useNavBar";
import { useCalendly } from "../hooks/integrations/useCalendly";
import { calendlyUrl } from "../config/constants";
import { Menu, X } from "lucide-react";
import DesktopMenu from "./Navbar/DesktopMenu";
import MobileMenu from "./Navbar/MobileMenu";
import Logo from "./Navbar/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

// Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { isOpen, setIsOpen } = useNavbar();
  const { openCalendly } = useCalendly();

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 md:py-6 px-6">
        <Logo />
        <DesktopMenu openCalendly={() => openCalendly(calendlyUrl)} />

        {/* Mobile Toggle */}
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
