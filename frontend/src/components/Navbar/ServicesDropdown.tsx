import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/navData";
import { useNavbar } from "../../hooks/ui/useNavBar";
import colors from "../../styles/colors";

export const ServicesDropdown = () => {
  const { isServicesOpen, setIsServicesOpen } = useNavbar();

  return (
    <motion.li
      className="relative"
      onMouseEnter={() => setIsServicesOpen(true)}
      onMouseLeave={() => setIsServicesOpen(false)}
    >
      <button
        className="flex items-center gap-1 hover:opacity-80 transition"
        style={{ color: colors.darkText }}
        aria-haspopup="true"
        aria-expanded={isServicesOpen}
      >
        Services <ChevronDown size={18} />
      </button>

      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4 z-50"
          >
            {services.map((group) => (
              <div key={group.category} className="text-left">
                <h4
                  className="font-semibold text-lg mb-2"
                  style={{ color: colors.primary }}
                >
                  {group.category}
                </h4>
                <ul>
                  {group.services.map((service) => (
                    <li key={service.name} className="border-b last:border-0">
                      <Link
                        to={service.link}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                        style={{ color: colors.darkText }}
                      >
                        {service.icon} {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export const ServicesDropdownMobile = () => {
  const { isServicesOpen, setIsServicesOpen, setIsOpen } = useNavbar();

  return (
    <li className="text-lg w-full">
      <button
        className="flex items-center justify-between w-full py-3 px-4 text-left font-semibold bg-gray-100 rounded-lg"
        onClick={() => setIsServicesOpen(!isServicesOpen)}
        aria-haspopup="true"
        aria-expanded={isServicesOpen}
      >
        Services
        <ChevronDown
          size={18}
          className={`${
            isServicesOpen ? "rotate-180" : ""
          } transition-transform`}
        />
      </button>

      <AnimatePresence>
        {isServicesOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden bg-white shadow-lg rounded-lg"
          >
            {services.map((group) => (
              <li key={group.category} className="text-left">
                <h4
                  className="px-4 py-2 font-bold"
                  style={{ color: colors.primary }}
                >
                  {group.category}
                </h4>
                <ul>
                  {group.services.map((service) => (
                    <li key={service.name}>
                      <Link
                        to={service.link}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
                        style={{ color: colors.darkText }}
                        onClick={() => {
                          setIsOpen();
                          setIsServicesOpen(false);
                        }}
                      >
                        {service.icon} {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
