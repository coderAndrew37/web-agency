import { Code, ShoppingBag, Search, Paintbrush } from "lucide-react";
import colors from "../styles/colors";

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

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">
          Our <span style={{ color: colors.primary }}>Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
