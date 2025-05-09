import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTestimonials } from "../hooks/testimonials/useTestimonial.ts";
import { TestimonialSkeleton } from "./TestimonialSkeleton";

const TestimonialList = () => {
  const { testimonials, isLoading, isError, fetchAll } = useTestimonials();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (isLoading) return <TestimonialSkeleton />;

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-12">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial._id}
          className="bg-white shadow-xl border border-gray-200 rounded-xl p-6 text-left flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold">
                {testimonial.name[0]}
              </div>
            )}
            <h4 className="text-lg font-semibold text-primary">
              {testimonial.name}
            </h4>
          </div>
          <p className="text-gray-700 text-base italic leading-relaxed">
            "{testimonial.message}"
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialList;
