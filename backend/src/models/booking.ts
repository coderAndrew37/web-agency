import mongoose from "mongoose";
import Joi from "joi";

// Interface for TypeScript type safety
interface IBooking extends mongoose.Document {
  calendlyEventUri: string;
  serviceType: string;
  user: mongoose.Types.ObjectId;
  meetingDate: Date;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    calendlyEventUri: {
      type: String,
      unique: true,
      index: true, // Added index for faster queries
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        "web-design",
        "app-development",
        "seo",
        "facebook-ads",
        "google-ads",
        "email-marketing",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Added index for faster queries
    },
    meetingDate: {
      type: Date,
      required: true,
      index: true, // Important for querying upcoming bookings
    },
    status: {
      type: String,
      default: "scheduled",
      enum: ["scheduled", "completed", "cancelled", "converted-to-project"],
    },
    notes: {
      type: String,
      trim: true, // Automatically trim whitespace
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Joi validation schema
const bookingValidationSchema = Joi.object({
  calendlyEventUri: Joi.string().uri().required(),
  serviceType: Joi.string()
    .valid(
      "web-design",
      "app-development",
      "seo",
      "facebook-ads",
      "google-ads",
      "email-marketing"
    )
    .required(),
  user: Joi.string().hex().length(24).required(),
  meetingDate: Joi.date().iso().required(),
  status: Joi.string()
    .valid("scheduled", "completed", "cancelled", "converted-to-project")
    .default("scheduled"),
  notes: Joi.string().allow("").trim(),
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

// Export both named and default exports for flexibility
export { Booking, bookingValidationSchema, IBooking };
export default Booking;
