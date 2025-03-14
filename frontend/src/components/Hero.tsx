import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center h-screen bg-background text-light px-6">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-background opacity-80"></div>

      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Build a <span className="text-primary">Premium Website</span> That
          Converts 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4">
          We design high-performance, conversion-focused websites that scale
          your business.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <button className="px-6 py-3 bg-primary text-dark font-bold text-lg rounded-full shadow-md hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-primary text-light font-bold text-lg rounded-full hover:bg-primary hover:text-dark transition">
            Book a Free Consultation
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
