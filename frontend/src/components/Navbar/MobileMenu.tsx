import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ServicesDropdownMobile } from "./ServicesDropdown";
import { useNavbar } from "../../hooks/ui/useNavBar";
import { LogOut } from "lucide-react"; // Removed unused User import

interface MobileNavItemProps {
  to: string;
  text: string;
  onClick: () => void;
  className?: string;
}

const MobileNavItem = ({
  to,
  text,
  onClick,
  className = "",
}: MobileNavItemProps) => (
  <li className="w-full text-center">
    <Link
      to={to}
      onClick={onClick}
      className={`text-lg hover:opacity-80 transition py-2 block ${className}`}
    >
      {text}
    </Link>
  </li>
);

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { user, logout, setIsOpen, setIsServicesOpen } = useNavbar();

  const handleLinkClick = () => {
    setIsOpen();
    setIsServicesOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-white shadow-md"
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            <MobileNavItem to="/" text="Home" onClick={handleLinkClick} />
            <ServicesDropdownMobile />
            <MobileNavItem
              to="/portfolio"
              text="Portfolio"
              onClick={handleLinkClick}
            />
            <MobileNavItem
              to="/testimonials"
              text="Testimonials"
              onClick={handleLinkClick}
            />
            <MobileNavItem
              to="/contact"
              text="Contact"
              onClick={handleLinkClick}
            />

            {/* Auth Links */}
            {user ? (
              <>
                {user.role === "admin" && (
                  <MobileNavItem
                    to="/admin"
                    text="⚡ Admin Panel"
                    onClick={handleLinkClick}
                    className="text-yellow-600 font-bold"
                  />
                )}
                <MobileNavItem
                  to="/dashboard"
                  text="Dashboard"
                  onClick={handleLinkClick}
                />
                <button
                  onClick={logout}
                  className="text-lg text-red-500 hover:opacity-80 transition flex items-center gap-2 px-4 py-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <MobileNavItem
                to="/login"
                text="Login"
                onClick={handleLinkClick}
                className="text-primary"
              />
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
