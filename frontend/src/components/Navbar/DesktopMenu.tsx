import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ServicesDropdown } from "./ServicesDropdown";
import colors from "../../styles/colors";
import { User, LogOut } from "lucide-react";
import { useNavbar } from "../../hooks/ui/useNavBar";

interface DesktopMenuProps {
  openCalendly: () => void;
}

const DesktopMenu = ({ openCalendly }: DesktopMenuProps) => {
  const { user, logout } = useNavbar();

  return (
    <ul className="hidden md:flex space-x-8 text-lg">
      {/* Regular Nav Items */}
      <NavItem to="/" text="Home" icon={undefined} />
      <ServicesDropdown />
      <NavItem to="/portfolio" text="Portfolio" icon={undefined} />
      <NavItem to="/testimonials" text="Testimonials" icon={undefined} />
      <NavItem to="/contact" text="Contact" icon={undefined} />

      {/* Auth Section */}
      {user ? (
        <>
          {user.role === "admin" && (
            <NavItem
              to="/admin"
              text="⚡ Admin Panel"
              className="text-yellow-600 font-bold"
              icon={undefined}
            />
          )}
          <NavItem to="/dashboard" text="Dashboard" icon={<User size={18} />} />
          <motion.li whileHover={{ scale: 1.1 }}>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:opacity-80 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </motion.li>
        </>
      ) : (
        <NavItem
          to="/login"
          text="Login"
          className="text-primary"
          icon={undefined}
        />
      )}

      {/* CTA Button */}
      <motion.li whileHover={{ scale: 1.05 }}>
        <button
          onClick={openCalendly}
          className="px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          Book a Call
        </button>
      </motion.li>
    </ul>
  );
};

// Internal reusable component
interface NavItemProps {
  to: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const NavItem = ({ to, text, icon, className = "" }: NavItemProps) => (
  <motion.li whileHover={{ scale: 1.1 }} className={className}>
    <Link
      to={to}
      className="hover:opacity-80 transition flex items-center gap-1"
      style={{ color: colors.darkText }}
    >
      {icon} {text}
    </Link>
  </motion.li>
);

export default DesktopMenu;
