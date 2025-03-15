import TestimonialForm from "../components/TestimonialForm";
import TestimonialList from "../components/TestimonialList";
import { motion } from "framer-motion";

const TestimonialPage = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl mt-12 font-bold text-center text-primary mb-8">
        💬 Testimonials
      </h1>

      <p className="text-center text-gray-600 max-w-lg mx-auto mb-12">
        See what our clients have to say about our services or share your own
        experience!
      </p>

      {/* ✅ Display Approved Testimonials */}
      <TestimonialList />
      {/* ✅ Testimonial Form (Only for Logged-in Users) */}
      <div className="mb-12">
        <TestimonialForm />
      </div>
    </motion.div>
  );
};

export default TestimonialPage;
