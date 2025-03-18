import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import FAQ from "../components/FAQ";
import WhatsAppButton from "../components/WhatsAppButton";
import colors from "../styles/colors";

const Contact = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 shadow-lg rounded-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 relative mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold" style={{ color: colors.primary }}>
          📩 Get in Touch with Us
        </h2>
        <p className="text-gray-600 mt-2">
          Have any questions? Fill out the form below, and we'll get back to you
          ASAP!
        </p>
      </div>

      {/* ✅ Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ✅ Contact Form (Left Side) */}
        <div>
          <ContactForm />
        </div>

        {/* ✅ Contact Info (Right Side) */}
        <div>
          <ContactInfo />
        </div>
      </div>

      {/* ✅ FAQ Section */}
      <div className="mt-12">
        <FAQ />
      </div>

      {/* ✅ Fixed Floating WhatsApp Button */}
      <WhatsAppButton />
    </motion.div>
  );
};

export default Contact;
