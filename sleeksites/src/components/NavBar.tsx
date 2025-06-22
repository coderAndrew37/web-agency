import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { calendlyUrl } from "../config/constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog-posts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center font-bold text-xl text-gray-900"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-10 h-10 rounded-lg flex items-center justify-center mr-2">
                SS
              </div>
              SleekSites
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to={calendlyUrl}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-md font-medium hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to={calendlyUrl}
              onClick={() => setIsMenuOpen(false)}
              className="block mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center px-4 py-2 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
