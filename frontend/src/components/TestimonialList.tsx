import { motion } from "framer-motion";
import { useFetchTestimonials } from "../hooks/testimonials/useTestimonialHooks";
import colors from "../styles/colors";
import { TestimonialSkeleton } from "./TestimonialSkeleton";
import type { Testimonial } from "../types/testimonial";

const TestimonialList = () => {
  const { data = [], isLoading, isError } = useFetchTestimonials();

  if (isLoading) return <TestimonialSkeleton />;

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto my-10">
        <p className="text-center text-red-500">
          Failed to load testimonials. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        🌟 What Our Clients Say
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">No testimonials yet.</p>
      ) : (
        <div className="space-y-6">
          {data.map((testimonial: Testimonial) => (
            <motion.div
              key={testimonial._id}
              className="p-6 border rounded-lg shadow-md bg-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt="User"
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                  loading="lazy"
                />
              )}
              <p className="text-lg text-gray-800">"{testimonial.message}"</p>
              <h4 className="mt-2 font-semibold text-primary">
                - {testimonial.name}
              </h4>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
