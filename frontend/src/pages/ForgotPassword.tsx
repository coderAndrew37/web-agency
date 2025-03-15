import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "../api/auth";
import { forgotPasswordSchema } from "../Utils/validationSchemas";
import { motion } from "framer-motion";

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await forgotPassword(data);
      setMessage(response.data.message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 shadow-lg bg-white rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {message && <p className="text-green-500 text-center mt-2">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Enter your email"
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <motion.button
          type="submit"
          className="btn-primary w-full"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
