import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "/free-resources" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ];

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
                SleekSites<span className="text-blue-600">Fitness</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              Coach Dashboard
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="block w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-2 rounded-md text-center font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Coach Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
