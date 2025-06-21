// src/components/WhatsAppCTA.tsx
import { Link } from "react-router-dom";

const WhatsAppCTA = () => {
  const phone = "254725746263";

  return (
    <Link
      to={`https://wa.me/${phone}?text=Hi%20there!%20I'm%20interested%20in%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center space-x-3"
    >
      {/* Glowing ring + icon */}
      <div className="relative">
        <span className="absolute -inset-1 animate-ping rounded-full bg-green-400 opacity-70" />
        <div className="relative z-10 bg-green-500 hover:bg-green-600 transition-colors p-4 rounded-full shadow-xl backdrop-blur-md border border-white/20">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M19.11 17.99c...z" />
          </svg>
        </div>
      </div>

      {/* Tooltip bubble */}
      <div className="hidden md:flex flex-col relative">
        <div className="text-white text-sm bg-black px-3 py-1 rounded-md shadow-lg mb-1 animate-fadeInUp">
          Have a question?
          <div className="absolute left-4 -bottom-2 w-3 h-3 bg-black transform rotate-45" />
        </div>
        <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-colors">
          Chat with us
        </div>
      </div>
    </Link>
  );
};

export default WhatsAppCTA;
