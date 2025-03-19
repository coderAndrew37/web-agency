import { motion } from "framer-motion";
import { JSX } from "react";

interface CardGridProps {
  title: string;
  items: { title: string; description: string; icon: JSX.Element }[];
}

const CardGrid = ({ title, items }: CardGridProps) => {
  return (
    <section className="py-20 text-center bg-white-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
