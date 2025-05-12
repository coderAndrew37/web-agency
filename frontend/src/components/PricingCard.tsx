import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  onBookNow?: (planName: string) => void;
}

const PricingCard = ({
  name,
  price,
  features,
  highlight,
  onBookNow,
}: PricingCardProps) => {
  return (
    <motion.div
      className={`p-8 border rounded-xl shadow-lg transition relative overflow-hidden ${
        highlight
          ? "border-primary scale-105 shadow-primary/50"
          : "border-gray-300"
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {highlight && (
        <motion.span
          className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-lg px-4 py-1 rounded-full font-bold shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          🚀 Popular
        </motion.span>
      )}
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="text-primary text-3xl font-bold mt-2">{price}</p>
      <ul className="mt-4 space-y-2 text-gray-600">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            ✔ {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onBookNow?.(name)}
        className="mt-6 px-6 py-3 bg-primary text-blue-700 text-lg font-semibold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition cursor-pointer"
      >
        Book Now <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

export default PricingCard;
