import { motion } from "framer-motion";
import { Code, ShoppingBag, Search, Paintbrush } from "lucide-react";

const services = [
  {
    title: "Custom Website Development",
    description:
      "We build high-performance, scalable websites tailored to your brand’s needs.",
    icon: <Code size={40} className="text-primary" />,
  },
  {
    title: "E-commerce Solutions",
    description:
      "We create powerful online stores that boost conversions and maximize revenue.",
    icon: <ShoppingBag size={40} className="text-primary" />,
  },
  {
    title: "SEO & Performance Optimization",
    description:
      "Rank higher on Google and increase organic traffic with our SEO strategies.",
    icon: <Search size={40} className="text-primary" />,
  },
  {
    title: "UI/UX Design & Branding",
    description:
      "We design visually stunning, user-friendly interfaces that leave a lasting impression.",
    icon: <Paintbrush size={40} className="text-primary" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-900 text-light">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our <span className="text-primary">Services</span>
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-dark border border-gray-700 rounded-lg text-center hover:border-primary transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
