import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../Utils/validationSchemas";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import colors from "../styles/colors";
import LoadingSpinner from "../components/LoadingSpinner";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login, loading, error: authError, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
      // No need to navigate here - AuthProvider will handle the redirect
    } catch {
      // Use error from auth context if available
      if (authError) {
        setFormError("root", { message: authError });
      } else {
        setFormError("root", { message: "Login failed. Please try again." });
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
        Welcome Back
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
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
            disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
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
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size={20} /> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </motion.button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
        <p className="text-gray-600">
          Forgot your password?{" "}
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Reset Password
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
