// pages/Login.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Utils/validationSchemas";
import AuthForm from "../components/AuthForm";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import FormError from "../components/FormError";
import TextInput from "../components/TextInput";
import { useLogin } from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login, loading, error } = useLogin();
  const { user } = useAuthContext();
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

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch {
      setFormError("root", {
        message: error?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      footer={
        <>
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
        </>
      }
    >
      <FormError message={errors.root?.message} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextInput
          register={register}
          name="email"
          placeholder="Email"
          disabled={isSubmitting}
          error={errors.email?.message}
        />

        <PasswordInput
          register={register}
          name="password"
          disabled={isSubmitting}
          error={errors.password?.message}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
        />

        <SubmitButton
          isLoading={isSubmitting || loading}
          label="Login"
          loadingLabel="Logging in..."
        />
      </form>
    </AuthForm>
  );
};

export default Login;
