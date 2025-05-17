import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import colors from "../styles/colors";

const ContactInfo = () => {
  return (
    <motion.div
      className="p-6 shadow-lg rounded-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3
        className="text-2xl font-bold text-center mb-4"
        style={{ color: colors.primary }}
      >
        📍 Contact Information
      </h3>

      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Phone size={24} style={{ color: colors.primary }} />
          <p className="text-lg text-gray-700">+254 725 746 263</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Mail size={24} style={{ color: colors.primary }} />
          <p className="text-lg text-gray-700">contact@sleeksites.co.ke</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <MapPin size={24} style={{ color: colors.primary }} />
          <p className="text-lg text-gray-700">Nairobi, Kenya</p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-6">
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.187373084145!2d36.8219469!3d-1.2863895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173b0db0c9fb%3A0x4b8e64c20cd362c2!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1647783213126"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
