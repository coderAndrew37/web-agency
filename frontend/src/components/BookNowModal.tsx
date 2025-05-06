import { useState, useEffect } from "react";
import { z } from "zod";

interface UserData {
  name?: string;
  email?: string;
  websiteType?: string;
  selectedPlan?: string;
  description?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  websiteType: z.string().min(2, "Website type is required"),
  description: z.string().min(10, "Project description too short"),
  budget: z.string().optional(),
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
    websiteType: "",
    description: "",
    budget: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        websiteType: userData.websiteType || "",
        description: userData.description || "",
      }));
    }
  }, [userData]);

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Book Your Strategy Call
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <form className="space-y-5 pt-2" onSubmit={handleSubmit}>
          {userData.selectedPlan && (
            <div className="text-left text-sm text-gray-600">
              <span className="font-semibold">Selected Plan:</span>{" "}
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
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Website Type (e.g. Ecommerce, Portfolio)"
              value={formData.websiteType}
              onChange={(e) =>
                setFormData({ ...formData, websiteType: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.websiteType && (
              <p className="text-sm text-red-500">{errors.websiteType}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full h-24 rounded-xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Estimated Budget (Optional)"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-primary text-white py-3 font-medium hover:bg-primary/90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
