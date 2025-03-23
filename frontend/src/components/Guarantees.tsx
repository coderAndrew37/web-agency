import { ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "100% Satisfaction Guarantee",
    description:
      "We stand by our services with a full money-back guarantee if you're not satisfied.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We value your time and promise to meet every deadline we set together.",
  },
  {
    icon: ThumbsUp,
    title: "Top Quality Assurance",
    description:
      "Every project undergoes strict quality checks to ensure excellence.",
  },
];

const Guarantees = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Guarantees</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {guarantees.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center border border-gray-200"
          >
            <item.icon size={40} className="text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Guarantees;
