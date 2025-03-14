import mongoose from "mongoose";
import Joi from "joi";

// ✅ Client Schema
const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    website: { type: String, default: "" },
    servicesInterested: { type: [String], required: true },
    budget: { type: Number, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Converted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

// ✅ Joi Validation Schema with Custom Error Messages
export const validateClient = (client: any) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(100)
      .regex(/^[a-zA-Z\s\-'.,]+$/) // Allow letters, spaces, hyphens, apostrophes, commas, and periods
      .required()
      .messages({
        "string.base": "Full Name must be a string.",
        "string.empty": "Full Name is required.",
        "string.min": "Full Name must be at least {#limit} characters long.",
        "string.max": "Full Name cannot exceed {#limit} characters.",
        "string.pattern.base":
          "Full Name can only contain letters, spaces, hyphens, apostrophes, commas, and periods.",
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } }) // Disallow invalid TLDs
      .required()
      .messages({
        "string.base": "Email must be a string.",
        "string.empty": "Email is required.",
        "string.email": "Enter a valid email address.",
      }),

    phone: Joi.string()
      .min(10)
      .max(15)
      .regex(/^[0-9]+$/) // Allow only numbers
      .required()
      .messages({
        "string.base": "Phone must be a string.",
        "string.empty": "Phone is required.",
        "string.min": "Phone must be at least {#limit} digits long.",
        "string.max": "Phone cannot exceed {#limit} digits.",
        "string.pattern.base": "Phone can only contain numbers.",
      }),

    businessName: Joi.string()
      .min(2)
      .max(100)
      .regex(/^[a-zA-Z0-9\s\-'.,&]+$/) // Allow letters, numbers, spaces, hyphens, apostrophes, commas, periods, and ampersands
      .required()
      .messages({
        "string.base": "Business Name must be a string.",
        "string.empty": "Business Name is required.",
        "string.min":
          "Business Name must be at least {#limit} characters long.",
        "string.max": "Business Name cannot exceed {#limit} characters.",
        "string.pattern.base":
          "Business Name can only contain letters, numbers, spaces, hyphens, apostrophes, commas, periods, and ampersands.",
      }),

    website: Joi.string()
      .uri({ scheme: ["http", "https"] }) // Allow only HTTP/HTTPS URLs
      .allow("")
      .messages({
        "string.base": "Website must be a string.",
        "string.uri":
          "Enter a valid URL (must start with http:// or https://).",
      }),

    servicesInterested: Joi.array()
      .items(Joi.string().valid("Website Development", "SEO", "Facebook Ads")) // Validate dropdown options
      .min(1)
      .required()
      .messages({
        "array.base": "Services Interested must be an array.",
        "array.empty": "At least one service must be selected.",
        "array.min": "At least one service must be selected.",
        "any.only": "Invalid service selected.",
      }),

    budget: Joi.number().min(1000).required().messages({
      "number.base": "Budget must be a number.",
      "number.empty": "Budget is required.",
      "number.min": "Budget must be at least {#limit}.",
    }),

    message: Joi.string().max(500).allow("").messages({
      "string.base": "Message must be a string.",
      "string.max": "Message cannot exceed {#limit} characters.",
    }),

    status: Joi.string()
      .valid("Pending", "Contacted", "Converted")
      .default("Pending")
      .messages({
        "string.base": "Status must be a string.",
        "any.only": "Invalid status selected.",
      }),
  });

  return schema.validate(client, { abortEarly: false }); // Return all validation errors at once
};

export default Client;
