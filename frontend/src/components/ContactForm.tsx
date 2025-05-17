import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { contactSchema } from "../Utils/validationSchemas";
import { useSubmitContactForm } from "../hooks/contact/useContactHooks";
import colors from "../styles/colors";
import { ContactFormData } from "../types/contact";

const ContactForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { mutateAsync: submitContact, isPending } = useSubmitContactForm();

  const onSubmit = async (data: ContactFormData) => {
    setStatusMessage(null);
    try {
      const res = await submitContact(data);
      setStatusMessage("✅ " + res.message);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      reset();
    } catch {
      setStatusMessage("❌ Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)(event);
    }
  };

  return (
    <motion.div
      className="p-6 shadow-lg rounded-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, scale: isSuccess ? 1.02 : 1 }}
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
          onKeyDown={handleKeyDown}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          onKeyDown={handleKeyDown}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <textarea
          {...register("message")}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          rows={5}
          onKeyDown={handleKeyDown}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <motion.button
          type="submit"
          className={`w-full py-3 font-bold rounded-lg shadow-md transition ${
            isPending ? "bg-gray-400" : "bg-primary"
          } text-blue-700 text-lg text-center hover:opacity-80 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
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
