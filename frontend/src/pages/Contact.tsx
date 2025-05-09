// pages/Contact.tsx
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import FAQ from "../components/FAQ";
import WhatsAppButton from "../components/WhatsAppButton";
import colors from "../styles/colors";

const Contact = () => {
  return (
    <motion.section
      className="max-w-7xl mx-auto p-6 md:p-12 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl border border-gray-200 mt-24 shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ color: colors.primary }}
        >
          📩 Let's Connect
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have a question, proposal, or just want to say hello? We'd love to
          hear from you.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactForm />
        <ContactInfo />
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <FAQ />
      </div>

      <WhatsAppButton />
    </motion.section>
  );
};

export default Contact;
