// models/Project.ts
import mongoose from "mongoose";
import Joi from "joi";

const ProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Validation schema using Joi
const projectValidationSchema = Joi.object({
  user: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .default("pending"),
  description: Joi.string(),
});

// Create the Project model
const Project = mongoose.model("Project", ProjectSchema);

export { Project, projectValidationSchema };
