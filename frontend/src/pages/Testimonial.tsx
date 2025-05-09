import TestimonialForm from "../components/TestimonialForm";
import TestimonialList from "../components/TestimonialList";
import { motion } from "framer-motion";

const TestimonialPage = () => {
  return (
    <motion.section
      className="bg-gray-50 min-h-screen py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          💬 Hear It From Real Clients
        </h1>
        <p className="text-gray-600 text-lg">
          Genuine stories from our customers—why they chose us and what happened
          next.
        </p>
      </div>

      <TestimonialList />

      <div className="max-w-3xl mx-auto mt-20">
        <TestimonialForm />
      </div>
    </motion.section>
  );
};

export default TestimonialPage;
