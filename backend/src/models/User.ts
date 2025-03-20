import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";

// ✅ Define User Interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(password: string): Promise<boolean>;
}

// ✅ User Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// ✅ Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ✅ Compare Password Method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Joi Validation Schema
export const validateUser = (user: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least {#limit} characters long.",
      "string.max": "Name cannot exceed {#limit} characters.",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": "Email must be a string.",
        "string.empty": "Email is required.",
        "string.email": "Enter a valid email address.",
      }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password must be at least {#limit} characters long.",
    }),
    role: Joi.string().valid("user", "admin").default("user").messages({
      "any.only": "Role must be either 'user' or 'admin'.",
    }),
  });

  return schema.validate(user, { abortEarly: false });
};

export default mongoose.model<IUser>("User", userSchema);
