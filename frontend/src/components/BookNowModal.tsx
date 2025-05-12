// components/BookNowModal.tsx
import { useState, useEffect } from "react";
import { z } from "zod";

interface UserData {
  name?: string;
  email?: string;
  selectedPlan?: string;
  description?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  description: z.string().min(10, "Project description too short"),
});

export default function BookNowModal({
  open,
  onOpenChange,
  userData = {} as UserData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData?: UserData;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep(1);
      setErrors({});
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        description:
          userData.description ||
          (userData.selectedPlan
            ? `We are interested in the ${userData.selectedPlan} plan. Please describe what this plan should cover for us.`
            : ""),
      });
    }
  }, [
    open,
    userData.description,
    userData.email,
    userData.name,
    userData.selectedPlan,
  ]);

  const validateStep = () => {
    if (step === 1) {
      const result = z
        .object({ name: formSchema.shape.name, email: formSchema.shape.email })
        .safeParse(formData);
      return result.success;
    } else {
      const result = z
        .object({ description: formSchema.shape.description })
        .safeParse(formData);
      return result.success;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Submitting:", {
        ...result.data,
        selectedPlan: userData.selectedPlan,
      });
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FDFDFD] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-[#222]">
            Book Your Strategy Call
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-[#555] hover:text-[#222] text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`w-4 h-4 rounded-full border-2 ${
                s === step
                  ? "bg-[#2563EB] border-[#2563EB]"
                  : "bg-gray-200 border-gray-400"
              }`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            {userData.selectedPlan && (
              <div className="text-left text-base text-[#555]">
                <span className="font-semibold text-[#222]">
                  Selected Plan:
                </span>{" "}
                {userData.selectedPlan}
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep()}
                className={`w-full rounded-xl py-3 font-medium transition ${
                  validateStep()
                    ? "bg-[#2563EB] text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {userData.selectedPlan && (
              <div className="text-left text-base text-[#555]">
                <span className="font-semibold text-[#222]">
                  Selected Plan:
                </span>{" "}
                {userData.selectedPlan}
              </div>
            )}

            <div>
              <textarea
                placeholder="Describe your project needs, goals, and audience. e.g. A marketing website with blog and email integration."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full h-32 rounded-xl border border-gray-300 bg-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-full rounded-xl bg-gray-200 text-[#222] py-3 font-medium hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#2563EB] text-white py-3 font-medium hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
