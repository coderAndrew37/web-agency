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
import { useClientOnboardingForm } from "../hooks/forms/useClientOnboardingForm";
import colors from "../styles/colors";

const ClientOnboarding = () => {
  const {
    step,
    register,
    errors,
    isValid,
    message,
    loading,
    selectedServices,
    handleSubmit,
    handleNextStep,
    handleBackStep,
    handleServiceChange,
    onSubmit,
  } = useClientOnboardingForm();

  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200">
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        🚀 Get Started with SleekSites
      </h2>

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

          {step === 3 && (
            <>
              <div>
                <label className="block font-semibold mb-2">
                  Services Interested In
                </label>
                <select
                  value={selectedServices}
                  onChange={handleServiceChange}
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

              <div>
                <label className="block font-semibold mb-2">Budget</label>
                <input
                  {...register("budget", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Budget"
                />
              </div>
              {errors.budget && (
                <p className="text-red-500">{errors.budget.message}</p>
              )}
            </>
          )}
        </motion.div>

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBackStep}
              className="text-primary flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={!isValid}
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
