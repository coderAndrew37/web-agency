import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema } from "../Utils/validationSchemas";
import { submitTestimonial } from "../api/testimonialApi";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import colors from "../styles/colors";

type TestimonialData = {
  name: string;
  message: string;
  image?: FileList;
};

const TestimonialForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialData>({
    resolver: zodResolver(testimonialSchema),
  });

  const onSubmit = async (data: TestimonialData) => {
    if (!user) {
      setError("You must be logged in to submit a testimonial.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await submitTestimonial(formData);
      setSuccess("✅ Testimonial submitted for approval!");
      reset(); // ✅ Clear form after successful submission
    } catch {
      setError("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-8 rounded-lg shadow-lg bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        📝 Share Your Experience
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <textarea
          {...register("message")}
          placeholder="Your Testimonial"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          rows={4}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <input type="file" {...register("image")} className="w-full" />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-80"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Testimonial"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
