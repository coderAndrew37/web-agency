import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import AuthForm from "../components/AuthForm";
import FormError from "../components/FormError";
import SubmitButton from "../components/SubmitButton";
import TextInput from "../components/TextInput";
import { useAuthForm } from "../hooks/auth/useAuthForm";
import { AuthService } from "../services/authService";

const schema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Code must be 6 digits"),
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
    console.log("[DEBUG] defaultEmail from query:", defaultEmail);
    console.log("[DEBUG] Auth user object on mount:", user);
    if (defaultEmail) setValue("email", defaultEmail);
  }, [defaultEmail, setValue, user]);

  useEffect(() => {
    if (user?.isVerified) {
      console.log("[DEBUG] User already verified. Redirecting...");
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
    console.log("[DEBUG] Form submitted with data:", data);
    try {
      const { user: verifiedUser } = await verify(data); // ✅ use returned user

      console.log("[DEBUG] Zustand user after verify:", verifiedUser);

      if (verifiedUser?.isVerified) {
        console.log("[DEBUG] User verified. Navigating to dashboard...");
        navigate("/dashboard");
      } else {
        console.warn(
          "[DEBUG] Verification call succeeded, but user is not marked verified"
        );
      }
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ error?: string }>;
      const detailedError = axiosErr?.response?.data?.error;
      const msg = detailedError || error || "Verification failed. Try again.";

      console.error("[DEBUG] OTP verification failed:", {
        data,
        error: msg,
        backend: axiosErr?.response?.data,
      });

      setError("root", { message: msg });
    }
  };

  const handleResend = async () => {
    console.log("[DEBUG] Attempting to resend OTP to:", defaultEmail);
    try {
      await AuthService.resendVerification(defaultEmail);
      console.log("[DEBUG] OTP resend successful");
      setResendCooldown(60);
      setResendMessage("OTP resent. Please check your email.");
    } catch (err) {
      console.error("[DEBUG] OTP resend failed:", err);
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
                className="text-blue-600 text-sm disabled:opacity-50 hover:text-blue-700 font-medium cursor-pointer"
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
