import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../Utils/validationSchemas";
import { Eye, EyeOff } from "lucide-react";
import colors from "../styles/colors";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../api/axiosInstance";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { login, loading: authLoading, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      await login({
        email: data.email,
        password: data.password,
      });
    } catch {
      if (authError) {
        setFormError("root", { message: authError });
      } else {
        setFormError("root", {
          message: "Registration failed. Please try again.",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6"
    >
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.primary }}
      >
        Create an Account
      </h2>

      {/* Combined error display */}
      {errors.root && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {errors.root.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
            disabled={isSubmitting || authLoading}
          />
          {errors.name && (
            <p className="mt-1 text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
            disabled={isSubmitting || authLoading}
          />
          {errors.email && (
            <p className="mt-1 text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm pr-10"
              disabled={isSubmitting || authLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting || authLoading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500">{errors.password.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-90 disabled:opacity-70"
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting || authLoading}
        >
          {isSubmitting || authLoading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size={20} /> Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log in
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
