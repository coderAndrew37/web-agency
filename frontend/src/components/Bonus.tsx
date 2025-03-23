import { Gift, Star, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const defaultBonuses = [
  {
    icon: Gift,
    title: "Exclusive Resources",
    description:
      "Get premium templates, guides, and tools to accelerate your success.",
  },
  {
    icon: Star,
    title: "1-on-1 Strategy Session",
    description:
      "A personal consultation to tailor our services to your unique needs.",
  },
  {
    icon: Rocket,
    title: "Lifetime Updates",
    description:
      "Stay ahead with ongoing updates and improvements to your service.",
  },
];

const Bonus = ({ bonuses = defaultBonuses }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center mb-6 uppercase text-yellow-400">
        🔥 Bonuses Included!
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {bonuses.map((bonus, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-black text-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-yellow-400"
          >
            <bonus.icon size={40} className="text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 uppercase">{bonus.title}</h3>
            <p className="text-gray-300">{bonus.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Bonus;
