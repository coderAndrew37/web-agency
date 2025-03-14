import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark bg-opacity-90 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-primary">
          WebElite<span className="text-light">Agency</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-light text-lg">
          {[
            "Home",
            "Services",
            "Portfolio",
            "Testimonials",
            "work with us",
            "Contact",
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              className="hover:text-primary transition"
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button (Desktop) */}
        <a
          href="#contact"
          className="hidden md:block px-6 py-3 bg-primary text-dark font-bold rounded-full shadow-md hover:scale-105 transition"
        >
          Book a Call
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-light"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-dark text-light shadow-md"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {["Home", "Services", "Portfolio", "Testimonials", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-lg hover:text-primary transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
              {/* CTA Button (Mobile) */}
              <a
                href="#contact"
                className="px-6 py-3 bg-primary text-dark font-bold rounded-full shadow-md hover:scale-105 transition"
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
