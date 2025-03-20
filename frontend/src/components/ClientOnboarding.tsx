import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useSubmitClientForm as submitClientForm } from "../api/apiClient"; // ✅ Correct import
import colors from "../styles/colors";
import {
  Mail,
  Phone,
  User,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";

// ✅ Define Schema with Zod
const clientSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z.string().min(2, "Business name is required"),
  servicesInterested: z
    .array(z.string())
    .nonempty("Please select at least one service"),
  budget: z.number().min(5000, "Budget must be at least Ksh 5,000"),
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
    watch,
    formState: { errors },
  } = useForm<ClientData>({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      servicesInterested: [],
      budget: 5000, // ✅ Set default minimum budget
      message: "",
    },
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: ClientData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await submitClientForm(data);
      setMessage("✅ " + response.message);
    } catch {
      setMessage("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Validate step completion before allowing Next
  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          watch("fullName") &&
          watch("email") &&
          watch("phone") &&
          !errors.fullName &&
          !errors.email &&
          !errors.phone
        );
      case 2:
        return watch("businessName") && !errors.businessName;
      case 3:
        return (
          watch("servicesInterested").length > 0 &&
          watch("budget") >= 5000 &&
          !errors.servicesInterested &&
          !errors.budget
        );
      default:
        return true;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200">
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        🚀 Get Started with SleekSites
      </h2>

      {/* ✅ Progress Bar (Animated) */}
      <motion.div className="relative w-full bg-gray-300 h-2 rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {message && (
        <p
          className={`text-center font-semibold mb-4 ${
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* ✅ Step 1: Personal Info */}
          {step === 1 && (
            <>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...register("fullName")}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary"
                  placeholder="Full Name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-10 p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Email Address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...register("phone")}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Phone Number"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </>
          )}

          {/* ✅ Step 2: Business Details */}
          {step === 2 && (
            <>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...register("businessName")}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Business Name"
                />
              </div>
              {errors.businessName && (
                <p className="text-red-500">{errors.businessName.message}</p>
              )}
            </>
          )}

          {/* ✅ Step 3: Services & Budget */}
          {step === 3 && (
            <>
              <div>
                <label className="block font-semibold mb-2">
                  Services Interested In
                </label>
                <select
                  {...register("servicesInterested")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  multiple
                >
                  <option value="Website Development">
                    Website Development
                  </option>
                  <option value="SEO">SEO</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                </select>
              </div>
              {errors.servicesInterested && (
                <p className="text-red-500">
                  {errors.servicesInterested.message}
                </p>
              )}
            </>
          )}
        </motion.div>

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-primary flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => isStepValid() && setStep(step + 1)}
              disabled={!isStepValid()}
              className="bg-primary text-black px-6 py-2 rounded-lg flex items-center gap-2"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary text-blue-700 text-lg px-6 py-2 rounded-lg"
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ClientOnboarding;
