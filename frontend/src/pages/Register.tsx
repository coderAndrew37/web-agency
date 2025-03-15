import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { registerUser } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../Utils/validationSchemas";
import { Eye, EyeOff } from "lucide-react";
import colors from "../styles/colors"; // ✅ Use theme colors

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    setError("");
    setLoading(true);
    try {
      const response = await registerUser(data);
      setUser(response.data.user);
      navigate("/dashboard"); // ✅ Auto-login after successful registration
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-bold text-center"
        style={{ color: colors.primary }}
      >
        Create an Account
      </h2>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary shadow-sm"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </motion.button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
