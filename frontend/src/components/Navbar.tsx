import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

        <ul className="hidden md:flex space-x-8 text-lg">
          {["Home", "Services", "Portfolio", "Testimonials", "Contact"].map(
            (item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:opacity-80 transition"
                  style={{ color: colors.darkText }}
                >
                  {item}
                </a>
              </motion.li>
            )
          )}
        </ul>

        <a
          href="#contact"
          className="hidden md:block px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
          style={{
            backgroundColor: colors.primary,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Book a Call
        </a>

        <button
          className="md:hidden"
          style={{ color: colors.darkText }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full"
          style={{ backgroundColor: "#fff", color: colors.darkText }}
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            {["Home", "Services", "Portfolio", "Testimonials", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-lg hover:opacity-80 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
            <a
              href="#contact"
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
    </nav>
  );
};

export default Navbar;
