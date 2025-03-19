import mongoose from "mongoose";
import Joi from "joi";

// ✅ Pricing Schema
const pricingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true },
    selectedFeatures: { type: [String], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const PricingRequest = mongoose.model("PricingRequest", pricingSchema);

// ✅ Joi Validation Schema
export const validatePricing = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Enter a valid email address.",
      "string.empty": "Email is required.",
    }),
    selectedFeatures: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .messages({
        "array.min": "Select at least one feature.",
      }),
    totalPrice: Joi.number().min(0).required().messages({
      "number.min": "Total price must be at least 0.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

export default PricingRequest;
