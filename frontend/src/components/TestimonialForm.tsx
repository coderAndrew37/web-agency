import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema } from "../Utils/validationSchemas";
import { useSubmitTestimonial } from "../hooks/testimonials/useTestimonialHooks";
import { useCurrentUser } from "../hooks/useAuth"; // ✅ fixed import
import { motion } from "framer-motion";
import colors from "../styles/colors";
import { Loader2 } from "lucide-react";

type TestimonialData = {
  name: string;
  message: string;
  image?: FileList;
};

const TestimonialForm = () => {
  const { data: user } = useCurrentUser(); // ✅ access user from hook

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialData>({
    resolver: zodResolver(testimonialSchema),
  });

  const {
    mutateAsync: submitTestimonial,
    isPending,
    isError,
    error,
    isSuccess,
  } = useSubmitTestimonial();

  const onSubmit = async (data: TestimonialData) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await submitTestimonial(formData);
      reset();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  if (!user) {
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
        <p className="text-center text-gray-600">
          Please sign in to submit a testimonial.
        </p>
      </motion.div>
    );
  }

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

      {isError && (
        <p className="text-red-500 text-center mb-4">
          ❌{" "}
          {error instanceof Error
            ? error.message
            : "Submission failed. Please try again."}
        </p>
      )}

      {isSuccess && (
        <p className="text-green-500 text-center mb-4">
          ✅ Testimonial submitted for approval!
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("message")}
            placeholder="Your Testimonial"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            rows={4}
            disabled={isPending}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="file"
            {...register("image")}
            className="w-full"
            disabled={isPending}
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 font-bold rounded-lg shadow-md transition bg-primary text-blue-700 text-lg hover:opacity-80 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending || isSubmitting}
        >
          {isPending || isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Testimonial"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
