import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { contactSchema } from "../Utils/validationSchemas";
import { submitContactForm as sendContactMessage } from "../api/contactApi";
import colors from "../styles/colors";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const response = await sendContactMessage(data);
      setStatusMessage(response.data.message);
    } catch {
      setStatusMessage("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 shadow-lg rounded-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3
        className="text-2xl font-bold text-center mb-4"
        style={{ color: colors.primary }}
      >
        📩 Send Us a Message
      </h3>

      {statusMessage && (
        <p
          className={`text-center font-semibold mb-4 ${
            statusMessage.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {statusMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name")}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <textarea
          {...register("message")}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          rows={5}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg text-lg hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
