import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div className="relative">
      <motion.a
        href="https://wa.me/254712345678?text=Hello,%20I%20need%20some%20assistance!"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-12 right-6 md:bottom-16 md:right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 flex items-center gap-2 transition z-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: "0 0 12px rgba(0, 255, 0, 0.7)",
          animation: "glow 1.8s infinite alternate",
        }}
      >
        <MessageCircle size={24} />
        Chat with Us
      </motion.a>

      <style>
        {`
          @keyframes glow {
            from { box-shadow: 0 0 12px rgba(0, 255, 0, 0.7); }
            to { box-shadow: 0 0 24px rgba(0, 255, 0, 1); }
          }
        `}
      </style>
    </div>
  );
};

export default WhatsAppButton;
