import mongoose, { Document } from "mongoose";
import Joi from "joi";

export interface IOtp extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    email: { type: String, required: true, lowercase: true },
    code: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true } // Optional: useful for debugging, but not required for logic
);

export const validateOtp = (otp: unknown) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Enter a valid email address.",
        "string.empty": "Email is required.",
      }),
    code: Joi.string().length(6).required().messages({
      "string.length": "OTP must be 6 digits.",
      "string.empty": "OTP is required.",
    }),
    attempts: Joi.number().integer().min(0).optional(),
  });

  return schema.validate(otp, { abortEarly: false });
};

export default mongoose.model<IOtp>("Otp", otpSchema);
