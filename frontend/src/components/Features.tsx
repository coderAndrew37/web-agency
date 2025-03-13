import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Code, Clock } from "lucide-react";

const features = [
  {
    title: "High-Performance Websites",
    description:
      "We build blazing-fast, conversion-focused websites that keep visitors engaged.",
    icon: <TrendingUp size={36} className="text-primary" />,
  },
  {
    title: "Security & Reliability",
    description:
      "Your website is protected with top-tier security measures and reliable hosting.",
    icon: <ShieldCheck size={36} className="text-primary" />,
  },
  {
    title: "Custom & Scalable Code",
    description:
      "Every project is built with clean, scalable, and maintainable code for long-term growth.",
    icon: <Code size={36} className="text-primary" />,
  },
  {
    title: "Fast Turnaround Time",
    description:
      "We prioritize speed—your website will be ready to launch in record time.",
    icon: <Clock size={36} className="text-primary" />,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-dark text-light">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose <span className="text-primary">Us?</span>
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-700 rounded-lg text-center bg-gray-900 hover:border-primary transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
