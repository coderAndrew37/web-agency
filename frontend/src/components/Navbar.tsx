import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/navData"; // Adjust the import path as necessary
import { useNavbar } from "../hooks/ui/useNavBar";
import colors from "../styles/colors";
import { useCalendly } from "../hooks/integrations/useCalendly";
import { calendlyUrl } from "../config/constants";

// Extend the Window interface to include Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { user, logout, isOpen, setIsOpen, isServicesOpen, setIsServicesOpen } =
    useNavbar();
  const { openCalendly } = useCalendly();
  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 md:py-6 px-6">
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ color: colors.primary }}
        >
          Sleek<span style={{ color: colors.darkText }}>Sites</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              to="/"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Home
            </Link>
          </motion.li>

          {/* ✅ Services Mega Dropdown */}
          <motion.li
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Services <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4"
                >
                  {services.map((group, index) => (
                    <div key={index} className="text-left">
                      <h4 className="font-semibold text-lg mb-2 text-primary">
                        {group.category}
                      </h4>
                      <ul>
                        {group.services.map((service, i) => (
                          <li key={i} className="border-b last:border-0">
                            <Link
                              to={service.link}
                              className="flex items-center gap-2 px-4 py-2 text-dark hover:bg-gray-100 transition"
                            >
                              {service.icon}
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              to="/portfolio"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Portfolio
            </Link>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              to="/testimonials"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Testimonials
            </Link>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <Link
              to="/contact"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Contact
            </Link>
          </motion.li>

          {/* Auth Links */}
          {user ? (
            <>
              {/* ✅ Admin Panel (Only for Admins) */}
              {user.role === "admin" && (
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link
                    to="/admin"
                    className="hover:opacity-80 transition flex items-center gap-1 text-yellow-600 font-bold"
                  >
                    ⚡ Admin Panel
                  </Link>
                </motion.li>
              )}

              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  to="/dashboard"
                  className="hover:opacity-80 transition flex items-center gap-1"
                >
                  <User size={18} />
                  Dashboard
                </Link>
              </motion.li>

              <motion.li whileHover={{ scale: 1.1 }}>
                <button
                  onClick={() => logout()}
                  className="hover:opacity-80 transition flex items-center gap-1 text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </motion.li>
            </>
          ) : (
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link
                to="/login"
                className="hover:opacity-80 transition text-primary"
              >
                Login
              </Link>
            </motion.li>
          )}
        </ul>

        {/* CTA Button (Desktop) */}
        <button
          onClick={() => openCalendly(calendlyUrl)}
          className="hidden md:block px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          Book a Call
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          style={{ color: colors.darkText }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-md"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* ✅ Services Dropdown (Mobile) */}
              <li className="text-lg w-full">
                <button
                  className="flex items-center justify-between w-full py-3 px-4 text-left font-semibold bg-gray-100 rounded-lg"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services{" "}
                  <ChevronDown
                    size={18}
                    className={`${
                      isServicesOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden bg-white shadow-lg rounded-lg"
                    >
                      {services.map((group, index) => (
                        <div key={index} className="text-left">
                          <h4 className="px-4 py-2 text-primary font-bold">
                            {group.category}
                          </h4>
                          {group.services.map((service, i) => (
                            <li key={i}>
                              <Link
                                to={service.link}
                                className="flex items-center gap-2 px-4 py-3 text-dark hover:bg-gray-100 transition"
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsServicesOpen(false);
                                }}
                              >
                                {service.icon} {service.name}
                              </Link>
                            </li>
                          ))}
                        </div>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link
                  to="/portfolio"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>

              {/* Auth Links (Mobile) */}
              {user ? (
                <>
                  {/* ✅ Admin Panel (Only for Admins) */}
                  {user.role === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="text-lg text-yellow-600 font-bold hover:opacity-80 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        ⚡ Admin Panel
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/dashboard"
                      className="text-lg hover:opacity-80 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="text-lg text-red-500 hover:opacity-80 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-lg text-primary hover:opacity-80 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
