import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/free-resources" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ];

  const handleAboutDropdownClick = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                SleekSites<span className="text-indigo-600">Ecom</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                onClick={handleAboutDropdownClick}
              >
                About <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <Link
                    to="/why-us"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Why Us
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    How It Works
                  </Link>
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Services
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              Book a Call
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <span className="block px-3 py-2 text-sm font-semibold text-gray-900">
                About
              </span>
              <Link
                to="/why-us"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link
                to="/how-it-works"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
            </div>
            <Link
              to="/contact"
              className="block w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-2 rounded-md text-center font-medium"
              onClick={() => setIsMenuOpen(false)}
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
