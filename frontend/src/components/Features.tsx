import { ShieldCheck, TrendingUp, Code, Clock } from "lucide-react";
import colors from "../styles/colors";

const features = [
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

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">
          Why Choose <span style={{ color: colors.primary }}>Us?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-300 rounded-lg text-center shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
