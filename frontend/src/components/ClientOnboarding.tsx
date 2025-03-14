import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { submitClientForm } from "../api/apiClient";
import colors from "../styles/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Define Schema with Zod
const clientSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z.string().min(2, "Business name is required"),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  servicesInterested: z
    .array(z.string())
    .nonempty("Please select at least one service"),
  budget: z.number().min(1000, "Budget must be at least Ksh 1,000"),
  message: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});

type ClientData = z.infer<typeof clientSchema>;

const ClientOnboarding = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      website: "",
      servicesInterested: [],
      budget: 1000,
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
      },
    });
  }, []);

  const onSubmit = async (data: ClientData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await submitClientForm(data);
      setMessage("✅ " + response.message);
      reset();
    } catch {
      setMessage("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={formRef}
      className="max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white"
    >
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        🚀 Get Started
      </h2>

      {message && (
        <p
          className={`text-center font-semibold mb-4 ${
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("fullName")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Full Name"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 font-bold rounded-lg shadow-md transition bg-primary text-white hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ClientOnboarding;
