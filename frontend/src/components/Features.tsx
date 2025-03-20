import { motion } from "framer-motion";
import { JSX } from "react";
import { ShieldCheck, TrendingUp, Code, Clock } from "lucide-react";
import colors from "../styles/colors";

interface FeaturesProps {
  title?: string;
  features?: { title: string; description: string; icon: JSX.Element }[];
}

// 🔥 Default Features (Web Development)
const defaultFeatures = [
  {
    title: "High-Performance Websites",
    description: "Blazing-fast websites that keep visitors engaged.",
    icon: <TrendingUp size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Security & Reliability",
    description: "Protected with top-tier security measures.",
    icon: <ShieldCheck size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Custom & Scalable Code",
    description: "Clean, scalable, and maintainable code for long-term growth.",
    icon: <Code size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Fast Turnaround Time",
    description: "We prioritize speed—your website will be ready quickly.",
    icon: <Clock size={36} style={{ color: colors.primary }} />,
  },
];

const Features = ({
  title = "Why Choose Us?",
  features = defaultFeatures,
}: FeaturesProps) => {
  return (
    <section className="py-20 text-center bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
