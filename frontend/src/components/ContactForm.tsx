import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { contactSchema } from "../Utils/validationSchemas";
import { useSubmitContactForm } from "../hooks/contact/useContactHooks";
import colors from "../styles/colors";
import { ContactFormData } from "../types/contact";

const ContactForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { mutateAsync: submitContact, isPending } = useSubmitContactForm();

  const onSubmit = async (data: ContactFormData) => {
    setStatusMessage(null);
    try {
      const res = await submitContact(data);
      setStatusMessage("✅ " + res.message);
    } catch {
      setStatusMessage("❌ Failed to send message. Please try again.");
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
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700  text-lg text-center hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
