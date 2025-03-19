import { ShieldCheck, TrendingUp, Code, Clock } from "lucide-react";
import colors from "../styles/colors";
import CardGrid from "./CardGrid";

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

const Features = () => <CardGrid title="Why Choose Us?" items={features} />;

export default Features;
