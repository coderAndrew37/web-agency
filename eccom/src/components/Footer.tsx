import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold">
              SleekSites<span className="text-pink-400">Ecommerce</span>
            </h3>
            <p className="mt-4 text-gray-400">
              We help entrepreneurs launch powerful ecommerce stores that grow
              their brand and drive conversions.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com/sleeksites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f h-6 w-6"></i>
              </a>
              <a
                href="https://twitter.com/sleeksites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter h-6 w-6"></i>
              </a>
              <a
                href="https://instagram.com/sleeksites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram h-6 w-6"></i>
              </a>
              <a
                href="https://linkedin.com/company/sleeksites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin-in h-6 w-6"></i>
              </a>
              <a
                href="https://www.youtube.com/@sleeksites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">YouTube</span>
                <i className="fab fa-youtube h-6 w-6"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Solutions</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Online Stores
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Payment Integration
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Product Management
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Sales Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/why-us" className="text-gray-400 hover:text-white">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white"
                >
                  How We Work
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-gray-400 hover:text-white"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/blog-posts"
                  className="text-gray-400 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SleekSites.co.ke. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/sitemap" className="text-gray-400 hover:text-white mr-4">
              Sitemap
            </Link>
            <Link
              to="/accessibility"
              className="text-gray-400 hover:text-white"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
