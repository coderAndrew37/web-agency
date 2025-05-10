import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthForm from "../components/AuthForm";
import TextInput from "../components/TextInput";
import SubmitButton from "../components/SubmitButton";
import FormError from "../components/FormError";
import { useAuthForm } from "../hooks/auth/useAuthForm";
import { AuthService } from "../services/authService";

const schema = z.object({
  email: z.string().email(),
  code: z.string().min(6, "Code must be 6 digits"),
});

type VerifyData = z.infer<typeof schema>;

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";

  const { verify, isLoading, error, user, clearError } = useAuthForm();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<VerifyData>({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail },
  });

  useEffect(() => {
    if (defaultEmail) setValue("email", defaultEmail);
  }, [defaultEmail, setValue]);

  useEffect(() => {
    if (user?.isVerified) {
      navigate("/dashboard");
    }
    return () => clearError();
  }, [user, navigate, clearError]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: VerifyData) => {
    try {
      await verify(data);
    } catch {
      setError("root", {
        message: error || "Verification failed. Try again.",
      });
    }
  };

  const handleResend = async () => {
    try {
      await AuthService.resendVerification(defaultEmail);
      setResendCooldown(60);
      setResendMessage("OTP resent. Please check your email.");
    } catch {
      setResendMessage("Failed to resend OTP.");
    }
  };

  const isVerified = user?.isVerified;

  return (
    <AuthForm title="Verify Your Account" footer={null}>
      {isVerified ? (
        <p className="text-green-600 text-center font-medium">
          You are already verified. Redirecting...
        </p>
      ) : (
        <>
          <FormError message={errors.root?.message || resendMessage} />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextInput
              name="email"
              register={register}
              placeholder="Email"
              disabled={true}
              error={errors.email?.message}
            />
            <TextInput
              name="code"
              register={register}
              placeholder="Enter OTP"
              disabled={isSubmitting || isLoading}
              error={errors.code?.message}
            />
            <div className="flex items-center justify-between">
              <SubmitButton
                isLoading={isSubmitting || isLoading}
                label="Verify"
                loadingLabel="Verifying..."
                disabled={isVerified}
              />
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isVerified}
                className="text-blue-600 text-sm disabled:opacity-50"
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
            </div>
          </form>
        </>
      )}
    </AuthForm>
  );
};

export default Verify;
