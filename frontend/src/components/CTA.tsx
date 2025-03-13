import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-dark text-light text-center">
      <motion.div
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Ready to Scale Your Business?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mt-4">
          Let’s build a high-performance website that brings in customers 24/7.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-dark text-primary font-bold text-lg rounded-full shadow-md hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-light text-light font-bold text-lg rounded-full hover:bg-light hover:text-dark transition">
            Book a Free Consultation
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
