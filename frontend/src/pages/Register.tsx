import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../Utils/validationSchemas";
import axiosInstance from "../api/axiosInstance";
import AuthForm from "../components/AuthForm";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import FormError from "../components/FormError";
import TextInput from "../components/TextInput";

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
    <AuthForm
      title="Create an Account"
      footer={
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      }
    >
      <FormError message={errors.root?.message} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextInput
          register={register}
          name="name"
          placeholder="Full Name"
          disabled={isSubmitting || authLoading}
          error={errors.name?.message}
        />

        <TextInput
          register={register}
          name="email"
          placeholder="Email"
          disabled={isSubmitting || authLoading}
          error={errors.email?.message}
        />

        <PasswordInput
          register={register}
          name="password"
          disabled={isSubmitting || authLoading}
          error={errors.password?.message}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />

        <SubmitButton
          isLoading={isSubmitting || authLoading}
          label="Sign Up"
          loadingLabel="Creating account..."
        />
      </form>
    </AuthForm>
  );
};

export default Register;
