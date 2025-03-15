import { useEffect, useState } from "react";
import { fetchTestimonials } from "../api/testimonialApi";
import { motion } from "framer-motion";
import colors from "../styles/colors";

type Testimonial = {
  _id: string;
  name: string;
  message: string;
  image?: string;
};

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const testimonialsData = await fetchTestimonials();
        setTestimonials(testimonialsData); // ✅ Directly setting response data
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.darkText }}
      >
        🌟 What Our Clients Say
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-gray-600">No testimonials yet.</p>
      ) : (
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
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
