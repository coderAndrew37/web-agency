import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { forgotPasswordSchema } from "../Utils/validationSchemas";
import { motion } from "framer-motion";
import colors from "../styles/colors";
import { useState } from "react";

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    clearError();
    setMessage("");
    try {
      const msg = await forgotPassword(data.email);
      setMessage(msg);
    } catch {
      // Error already handled in store
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: colors.primary }}
      >
        Forgot Password?
      </h2>
      <p className="text-center text-gray-600">
        Enter your email to receive a reset link.
      </p>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {message && <p className="text-green-500 text-center mt-2">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <input
          {...register("email")}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
