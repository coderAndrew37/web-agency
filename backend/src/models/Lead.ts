import mongoose from "mongoose";
import Joi from "joi";

// ✅ Lead Schema
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    resourceType: { type: String, required: true }, // e.g., "SEO Guide"
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

// ✅ Joi Validation Schema
export const validateLead = (lead: any) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    resourceType: Joi.string().min(3).required(),
  });

  return schema.validate(lead, { abortEarly: false });
};

export default Lead;
