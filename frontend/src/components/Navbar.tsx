import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Web Development", link: "/services/web-development" },
  { name: "App Development", link: "/services/app-development" },
  { name: "Facebook Ads", link: "/services/facebook-ads" },
  { name: "SEO Optimization", link: "/services/seo" },
  { name: "E-commerce Solutions", link: "/services/ecommerce" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
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

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between py-6 px-6">
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

          {/* Services Dropdown */}
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
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  {services.map((service, index) => (
                    <li key={index} className="border-b last:border-0">
                      <Link
                        to={service.link}
                        className="block px-4 py-3 text-dark hover:bg-gray-100 transition"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
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
                  onClick={logout}
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
        <Link
          to="/contact"
          className="hidden md:block px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          Book a Call
        </Link>

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

              {/* Services Dropdown (Mobile) */}
              <li className="text-lg">
                <details>
                  <summary className="cursor-pointer">Services</summary>
                  <ul className="mt-2 pl-4">
                    {services.map((service, index) => (
                      <li key={index}>
                        <Link
                          to={service.link}
                          className="block py-2 hover:text-primary transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
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
                      onClick={logout}
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
