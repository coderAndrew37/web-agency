import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      id: "nav",
      title: "Navigation",
      items: ["Home", "About", "Contact", "Testimonials"].map((label) => ({
        label,
        href: `/${label.toLowerCase()}`,
      })),
    },
    {
      id: "services",
      title: "Services",
      items: [
        ["Web Development", "web-development"],
        ["App Development", "app-development"],
        ["SEO", "seo"],
        ["Google Ads", "google-ads"],
        ["Facebook Ads", "facebook-ads"],
        ["Email Marketing", "email-marketing"],
        ["M-Pesa Integration", "mpesa-integration"],
      ].map(([label, slug]) => ({ label, href: `/services/${slug}` })),
    },
    {
      id: "contact",
      title: "Contact Us",
      items: [], // handled separately
    },
  ];

  return (
    <footer className="bg-[#f9f9f9] text-sm text-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-black">SleekSites</h3>
          <p className="mt-3 text-gray-600">
            High-performance websites that drive results.
          </p>
        </div>

        {/* Collapsible Sections */}
        {sections.map(({ id, title, items }) => (
          <div key={id}>
            <button
              className="w-full flex justify-between items-center md:cursor-default text-left text-lg font-semibold text-gray-900 md:pointer-events-none"
              onClick={() => (isMobile ? toggleSection(id) : null)}
            >
              {title}
              {isMobile && <span>{openSection === id ? "−" : "+"}</span>}
            </button>
            <ul
              className={`mt-4 space-y-2 transition-all duration-300 overflow-hidden ${
                !isMobile || openSection === id ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {id === "contact" ? (
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone size={16} /> +254 712 345 678
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> info@sleeksites.co.ke
                  </p>
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="hover:text-blue-600">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="hover:text-blue-600">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="hover:text-blue-600">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              ) : (
                items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-blue-600">
                      {label}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} SleekSites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
