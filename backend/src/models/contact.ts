import mongoose from "mongoose";
import Joi from "joi";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    message: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);

export const validateContact = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(1000).required(),
  });
  return schema.validate(data);
};
