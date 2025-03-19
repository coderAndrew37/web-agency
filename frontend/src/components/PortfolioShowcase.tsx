// src/components/PortfolioShowcase.tsx
import { motion } from "framer-motion";

interface Project {
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface PortfolioShowcaseProps {
  projects: Project[];
}

const PortfolioShowcase = ({ projects }: PortfolioShowcaseProps) => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-8">Our Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <ul className="mt-3 text-left text-gray-700">
              {project.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
