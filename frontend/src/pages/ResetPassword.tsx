import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { resetPasswordSchema } from "../Utils/validationSchemas";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import colors from "../styles/colors";
import { useState } from "react";

type ResetPasswordData = {
  password: string;
};

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    clearError();
    setMessage("");
    try {
      await resetPassword(token!, data);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
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
        Reset Your Password
      </h2>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {message && <p className="text-green-500 text-center mt-2">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-white text-lg hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ResetPassword;
