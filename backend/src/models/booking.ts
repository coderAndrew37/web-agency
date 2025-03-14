import mongoose from "mongoose";
import Joi from "joi";

const bookingSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    platform: {
      type: String,
      enum: ["Google Meet", "Zoom", "Phone Call", "WhatsApp"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ✅ Joi Validation Schema
export const validateBooking = (booking: any) => {
  const schema = Joi.object({
    clientName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Full Name is required.",
    }),
    clientEmail: Joi.string().email().required().messages({
      "string.email": "Enter a valid email address.",
    }),
    phone: Joi.string().min(10).max(15).required().messages({
      "string.empty": "Phone number is required.",
    }),
    date: Joi.date().greater("now").required().messages({
      "date.base": "Invalid date format.",
      "date.greater": "You can't book for past dates.",
    }),
    time: Joi.string().required().messages({
      "string.empty": "Time is required.",
    }),
    platform: Joi.string()
      .valid("Google Meet", "Zoom", "Phone Call", "WhatsApp")
      .required()
      .messages({
        "any.only": "Invalid platform selection.",
      }),
  });

  return schema.validate(booking, { abortEarly: false });
};

export default Booking;
