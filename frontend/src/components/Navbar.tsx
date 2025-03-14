import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
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
      backgroundColor: "rgba(255, 255, 255, 0.95)", // Light navbar
      padding: "12px 0",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    });
  }, []);

  return (
    <nav
      className="navbar fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container mx-auto flex items-center justify-between py-6 px-6">
        <a
          href="/"
          className="text-2xl font-bold"
          style={{ color: colors.primary }}
        >
          Sleek<span style={{ color: colors.darkText }}>Sites</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <motion.li whileHover={{ scale: 1.1 }}>
            <a
              href="/"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Home
            </a>
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
                      <a
                        href={service.link}
                        className="block px-4 py-3 text-dark hover:bg-gray-100 transition"
                      >
                        {service.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <a
              href="/portfolio"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Portfolio
            </a>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <a
              href="/testimonials"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Testimonials
            </a>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }}>
            <a
              href="/contact"
              className="hover:opacity-80 transition"
              style={{ color: colors.darkText }}
            >
              Contact
            </a>
          </motion.li>
        </ul>

        {/* CTA Button (Desktop) */}
        <a
          href="/contact"
          className="hidden md:block px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{
            backgroundColor: colors.primary,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Book a Call
        </a>

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
                <a
                  href="/"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
              </li>

              {/* Services Dropdown (Mobile) */}
              <li className="text-lg">
                <details>
                  <summary className="cursor-pointer">Services</summary>
                  <ul className="mt-2 pl-4">
                    {services.map((service, index) => (
                      <li key={index}>
                        <a
                          href={service.link}
                          className="block py-2 hover:text-primary transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li>
                <a
                  href="/portfolio"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </a>
              </li>

              <li>
                <a
                  href="/testimonials"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-lg hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>

              {/* CTA Button (Mobile) */}
              <a
                href="/contact"
                className="px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
                style={{
                  backgroundColor: colors.primary,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Book a Call
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
