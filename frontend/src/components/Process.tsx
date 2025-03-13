import { motion } from "framer-motion";
import { ClipboardCheck, Layout, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Consultation",
    description: "We discuss your vision and goals.",
    icon: <ClipboardCheck size={36} className="text-primary" />,
  },
  {
    title: "Design & Development",
    description: "We craft a visually stunning and functional site.",
    icon: <Layout size={36} className="text-primary" />,
  },
  {
    title: "Testing & Launch",
    description: "We ensure everything runs smoothly before going live.",
    icon: <Rocket size={36} className="text-primary" />,
  },
  {
    title: "Security & Maintenance",
    description: "Ongoing support to keep your site running perfectly.",
    icon: <ShieldCheck size={36} className="text-primary" />,
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-gray-900 text-light">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-700 rounded-lg text-center bg-dark hover:border-primary transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
