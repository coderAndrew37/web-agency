import { motion } from "framer-motion";
import colors from "../styles/colors";

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center h-screen bg-cover bg-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tight"
          style={{ color: colors.darkText }}
        >
          Who We Are & Why We Build{" "}
          <span style={{ color: colors.primary }}>Premium Websites</span>
        </h1>
        <p
          className="text-lg md:text-xl mt-4"
          style={{ color: colors.lightText }}
        >
          Helping businesses scale with high-performance websites.
        </p>
        <button
          className="mt-6 px-6 py-3 font-bold text-lg rounded-full shadow-md transition hover:opacity-90"
          style={{
            backgroundColor: colors.primary,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Book a Free Consultation
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
