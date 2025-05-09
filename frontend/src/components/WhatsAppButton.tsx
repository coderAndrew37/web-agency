// components/WhatsAppButton.tsx
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 10000); // re-show after 10 seconds
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.a
        href="https://wa.me/254725746263?text=Hello,%20I%20need%20some%20assistance!"
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip-id="whatsapp-tooltip"
        data-tooltip-content="Chat with us on WhatsApp"
        onClick={handleClick}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-green-500 text-white px-4 py-3 rounded-l-full shadow-2xl hover:bg-green-600 flex items-center gap-2 transition-all"
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        style={{
          animation:
            "glow 1.5s ease-in-out infinite alternate, bounce 4s ease-in-out infinite",
        }}
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline text-base font-semibold">Chat</span>
      </motion.a>

      <Tooltip id="whatsapp-tooltip" place="left" className="z-50" />

      <style>
        {`
          @keyframes glow {
            from { box-shadow: 0 0 10px rgba(72, 187, 120, 0.5); }
            to { box-shadow: 0 0 20px rgba(72, 187, 120, 0.9); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </>
  );
};

export default WhatsAppButton;
