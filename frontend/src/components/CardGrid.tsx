import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardItem {
  title: string;
  description: string | ReactNode;
  icon: ReactNode;
}

interface CardGridProps {
  title: string;
  subtitle?: string;
  items: CardItem[];
  variant?: "default" | "dark" | "soft";
}

const bgVariants = {
  default: "bg-white-100",
  dark: "bg-gray-900 text-white",
  soft: "bg-gray-100",
};

const CardGrid = ({
  title,
  subtitle,
  items,
  variant = "default",
}: CardGridProps) => {
  return (
    <section
      className={`py-20 text-center ${bgVariants[variant]}`}
      role="region"
      aria-label={title}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-gray-600 mb-10">{subtitle}</p>}

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
              <div className="text-gray-600 dark:text-gray-300">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
