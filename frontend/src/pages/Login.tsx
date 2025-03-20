import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLoginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../Utils/validationSchemas";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import colors from "../styles/colors";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const loginUser = useLoginUser(); // ✅ Use Mutation Hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    loginUser.mutateAsync(data, {
      onSuccess: (response) => {
        setUser(response.data.user); // ✅ Set user after success
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-bold text-center"
        style={{ color: colors.primary }}
      >
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={loginUser.isPending}
        >
          {loginUser.isPending ? "Logging in..." : "Login"}
        </motion.button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
      <p className="text-center mt-4 text-gray-600">
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Reset Password
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
