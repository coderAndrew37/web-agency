import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ Fixed import
import { loginSchema } from "../Utils/validationSchemas";
import { Eye, EyeOff } from "lucide-react"; // ✅ Icons for show/hide password

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Password visibility state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(data);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* ✅ Password Field with Show/Hide Toggle */}
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input pr-10"
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

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Reset it here
        </Link>
      </p>
    </div>
  );
};

export default Login;
