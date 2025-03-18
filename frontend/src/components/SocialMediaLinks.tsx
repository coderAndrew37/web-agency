import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // ✅ Use Simple Icons
import colors from "../styles/colors";

const socialLinks = [
  { name: "Facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
  { name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com" },
  { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
];

const SocialMediaLinks = () => {
  return (
    <motion.div
      className="p-6 shadow-lg rounded-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
        🔗 Connect With Us
      </h3>

      <div className="flex justify-center gap-6">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full shadow-md bg-gray-200 hover:bg-primary text-xl text-white transition flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialMediaLinks;
