import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-4"
        >
          Crafting Premium Mobile Apps That Drive Results
        </motion.h1>
        <p className="text-xl mb-8">
          From concept to launch, we build apps that users love and businesses
          trust.
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 bg-white text-primary font-bold rounded-full shadow-lg hover:opacity-80 transition"
        >
          Get a Free Consultation
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
