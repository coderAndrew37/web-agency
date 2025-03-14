import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { submitClientForm } from "../api/apiClient";

// ✅ Define Schema with Zod
const clientSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .regex(/^[a-zA-Z\s\-'.,]+$/, {
      message:
        "Full Name can only contain letters, spaces, hyphens, apostrophes, commas, and periods.",
    }),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, { message: "Phone can only contain numbers." }),
  businessName: z
    .string()
    .min(2, "Business name is required")
    .regex(/^[a-zA-Z0-9\s\-'.,&]+$/, {
      message:
        "Business Name can only contain letters, numbers, spaces, hyphens, apostrophes, commas, periods, and ampersands.",
    }),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")), // Allow empty string
  servicesInterested: z
    .array(z.string())
    .nonempty("Please select at least one service"),
  budget: z.number().min(1000, "Budget must be at least Ksh 1,000"),
  message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
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

  const onSubmit = async (data: ClientData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await submitClientForm(data);
      setMessage(response.message);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Submission failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Client Onboarding Form
      </h2>
      {message && (
        <p
          className={`text-center ${
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("fullName")}
          className="input"
          placeholder="Full Name"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input {...register("phone")} className="input" placeholder="Phone" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <input
          {...register("businessName")}
          className="input"
          placeholder="Business Name"
        />
        {errors.businessName && (
          <p className="text-red-500">{errors.businessName.message}</p>
        )}

        <input
          {...register("website")}
          className="input"
          placeholder="Website (Optional)"
        />
        {errors.website && (
          <p className="text-red-500">{errors.website.message}</p>
        )}

        <div>
          <label className="block text-white mb-2">Services Interested</label>
          <select
            {...register("servicesInterested")}
            className="input"
            multiple // Allow multiple selections
          >
            <option value="Website Development">Website Development</option>
            <option value="SEO">SEO</option>
            <option value="Facebook Ads">Facebook Ads</option>
          </select>
          {errors.servicesInterested && (
            <p className="text-red-500">{errors.servicesInterested.message}</p>
          )}
        </div>

        <input
          {...register("budget", { valueAsNumber: true })} // Parse as number
          type="number"
          className="input"
          placeholder="Budget (Ksh)"
        />
        {errors.budget && (
          <p className="text-red-500">{errors.budget.message}</p>
        )}

        <textarea
          {...register("message")}
          className="input"
          placeholder="Message (Optional)"
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ClientOnboarding;