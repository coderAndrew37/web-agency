import mongoose, { Document } from "mongoose";
import Joi from "joi";

export interface ITestimonial extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  message: string;
  image?: string;
  approved: boolean;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true, minlength: 3 },
    message: { type: String, required: true, maxlength: 500 },
    image: { type: String, default: null },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);

// ✅ Joi Validation Schema
export const validateTestimonial = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    message: Joi.string().max(500).required(),
    image: Joi.string().uri().optional().allow(""),
  });

  return schema.validate(data, { abortEarly: false });
};

export default Testimonial;
