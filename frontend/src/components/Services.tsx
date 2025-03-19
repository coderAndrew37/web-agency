import { Code, ShoppingBag, Search, Paintbrush } from "lucide-react";
import colors from "../styles/colors";
import CardGrid from "./CardGrid";

const services = [
  {
    title: "Custom Website Development",
    description: "Scalable websites tailored to your brand’s needs.",
    icon: <Code size={40} style={{ color: colors.primary }} />,
  },
  {
    title: "E-commerce Solutions",
    description: "Powerful online stores that boost conversions.",
    icon: <ShoppingBag size={40} style={{ color: colors.primary }} />,
  },
  {
    title: "SEO & Performance Optimization",
    description: "Rank higher on Google and increase traffic.",
    icon: <Search size={40} style={{ color: colors.primary }} />,
  },
  {
    title: "UI/UX Design & Branding",
    description: "Visually stunning interfaces that leave an impression.",
    icon: <Paintbrush size={40} style={{ color: colors.primary }} />,
  },
];

const Services = () => <CardGrid title="Our Services" items={services} />;

export default Services;
