import mongoose from "mongoose";
import Joi from "joi";

const ProjectSchema = new mongoose.Schema(
  {
    booking: {
      // Reference to the original booking
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      // Added to match booking
      type: String,
      enum: [
        "web-design",
        "app-development",
        "seo",
        "facebook-ads",
        "google-ads",
        "email-marketing",
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "awaiting-feedback", "completed"],
      default: "not-started",
    },
    milestones: [
      {
        // Added milestones array
        name: String,
        completed: Boolean,
        deadline: Date,
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const projectValidationSchema = Joi.object({
  booking: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).required(),
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
  name: Joi.string().required(),
  status: Joi.string()
    .valid("not-started", "in-progress", "awaiting-feedback", "completed")
    .default("not-started"),
  milestones: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      completed: Joi.boolean().default(false),
      deadline: Joi.date().iso(),
    })
  ),
  description: Joi.string().allow(""),
});

const Project = mongoose.model("Project", ProjectSchema);

export { Project, projectValidationSchema };
