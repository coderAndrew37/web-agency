import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useAuth";
import { registerSchema } from "../Utils/validationSchemas";
import AuthForm from "../components/AuthForm";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import FormError from "../components/FormError";
import TextInput from "../components/TextInput";
import { z } from "zod";

// 🔐 Infer types from schema
type RegisterData = z.infer<typeof registerSchema>;

const Register = () => {
  const { mutateAsync: register, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await register(data);
    } catch {
      setFormError("root", {
        message: error?.message || "Registration failed. Try again.",
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
          disabled={isPending}
          error={errors.name?.message}
        />
        <TextInput
          register={formRegister}
          name="email"
          placeholder="Email"
          disabled={isPending}
          error={errors.email?.message}
        />
        <PasswordInput
          register={formRegister}
          name="password"
          disabled={isPending}
          error={errors.password?.message}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        <SubmitButton
          isLoading={isPending}
          label="Sign Up"
          loadingLabel="Creating account..."
        />
      </form>
    </AuthForm>
  );
};

export default Register;
