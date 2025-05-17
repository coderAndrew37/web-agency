// src/models/booking.ts
import mongoose from "mongoose";
import Joi from "joi";
import { IUser } from "./User";

interface IBooking extends mongoose.Document {
  name: string;
  email: string;
  selectedPlan: string;
  description: string;
  status: string;
  serviceType: string;
  meetingDate?: Date;
  notes?: string;
  user: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, lowercase: true },
    selectedPlan: { type: String, required: true },
    description: { type: String, required: true, trim: true, minlength: 10 },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "completed", "cancelled"],
    },
    serviceType: { type: String, required: true },
    meetingDate: { type: Date },
    notes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const bookingValidationSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name is required",
    "string.empty": "Name is required",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),
  selectedPlan: Joi.string().required(),
  description: Joi.string().min(10).required().messages({
    "string.min": "Project description too short",
    "string.empty": "Description is required",
  }),
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export { Booking, IBooking };
