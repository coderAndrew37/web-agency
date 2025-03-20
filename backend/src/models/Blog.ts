import mongoose from "mongoose";
import Joi from "joi";

// ✅ Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, required: true }, // Thumbnail Image URL
    metaTitle: { type: String }, // SEO Optimization
    metaDescription: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

// ✅ Joi Validation Schema with Custom Error Messages
export const validateBlog = (blog: any) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(200).required().messages({
      "string.base": "Title must be a string.",
      "string.empty": "Title is required.",
      "string.min": "Title must be at least {#limit} characters long.",
      "string.max": "Title cannot exceed {#limit} characters.",
    }),

    content: Joi.string().min(50).required().messages({
      "string.base": "Content must be a string.",
      "string.empty": "Content is required.",
      "string.min": "Content must be at least {#limit} characters long.",
    }),

    category: Joi.string().required().messages({
      "string.base": "Category must be a string.",
      "string.empty": "Category is required.",
    }),

    tags: Joi.array().items(Joi.string()).messages({
      "array.base": "Tags must be an array of strings.",
    }),

    image: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required()
      .messages({
        "string.base": "Image must be a string.",
        "string.uri": "Enter a valid image URL (http:// or https://).",
        "string.empty": "Image is required.",
      }),

    metaTitle: Joi.string().max(60).allow("").messages({
      "string.max": "Meta title cannot exceed {#limit} characters.",
    }),

    metaDescription: Joi.string().max(160).allow("").messages({
      "string.max": "Meta description cannot exceed {#limit} characters.",
    }),

    status: Joi.string().valid("Draft", "Published").default("Draft").messages({
      "any.only": "Status must be either 'Draft' or 'Published'.",
    }),
  });

  return schema.validate(blog, { abortEarly: false });
};

export default Blog;
