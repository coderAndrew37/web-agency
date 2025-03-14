import mongoose from "mongoose";
import Joi from "joi";

// ✅ Subscriber Schema
const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// ✅ Joi Validation Schema
export const validateSubscriber = (subscriber: any) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Enter a valid email address.",
        "string.empty": "Email is required.",
      }),
  });

  return schema.validate(subscriber);
};

export default Subscriber;
