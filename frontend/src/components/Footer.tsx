import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-primary">WebEliteAgency</h3>
          <p className="mt-2 text-gray-400">
            High-performance websites that drive results.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-light">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            {["Home", "Services", "Portfolio", "Testimonials", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-primary transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h4 className="text-xl font-semibold text-light">Contact Us</h4>
          <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
            <Phone size={18} /> +254 712 345 678
          </p>
          <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
            <Mail size={18} /> info@webelite.com
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="hover:text-primary transition">
              <FacebookIcon size={24} />
            </a>
            <a href="#" className="hover:text-primary transition">
              <InstagramIcon size={24} />
            </a>
            <a href="#" className="hover:text-primary transition">
              <LinkedinIcon size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} WebEliteAgency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
