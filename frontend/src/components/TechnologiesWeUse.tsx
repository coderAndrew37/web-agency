// src/components/TechnologiesWeUse.tsx
import { motion } from "framer-motion";
import { JSX } from "react";

interface Tech {
  name: string;
  icon: JSX.Element;
}

interface TechnologiesWeUseProps {
  technologies: Tech[];
}

const TechnologiesWeUse = ({ technologies }: TechnologiesWeUseProps) => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-8">Technologies We Use</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-16 mx-auto mb-2">{tech.icon}</div>
            <p className="text-gray-700">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesWeUse;
