import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerSchema } from "../Utils/validationSchemas";
import AuthForm from "../components/AuthForm";
import FormError from "../components/FormError";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import TextInput from "../components/TextInput";
import { useAuthForm } from "../hooks/auth/useAuthForm";

type RegisterData = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading, error, register, clearError } = useAuthForm();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: RegisterData) => {
    try {
      console.log("[Register] Submitting registration data:", data);
      const result = await register(data);
      console.log("[Register] Registration success:", result);

      if (result?.email) {
        const target = `/verify?email=${encodeURIComponent(result.email)}`;
        console.log("[Register] Redirecting to:", target);
        navigate(target);
      }
    } catch (err) {
      console.error("[Register] Registration failed:", err);
      setFormError("root", {
        message: error || "Registration failed. Try again.",
      });
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
          register={formRegister}
          name="name"
          placeholder="Full Name"
          disabled={isSubmitting || isLoading}
          error={errors.name?.message}
        />
        <TextInput
          register={formRegister}
          name="email"
          placeholder="Email"
          disabled={isSubmitting || isLoading}
          error={errors.email?.message}
        />
        <PasswordInput
          register={formRegister}
          name="password"
          disabled={isSubmitting || isLoading}
          error={errors.password?.message}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        <SubmitButton
          isLoading={isSubmitting || isLoading}
          label="Sign Up"
          loadingLabel="Creating account..."
        />
      </form>
    </AuthForm>
  );
};

export default Register;
