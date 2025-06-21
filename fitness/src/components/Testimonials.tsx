import { motion } from "framer-motion";
import { useMemo } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title: string;
  subtitle: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = ({ testimonials, title, subtitle }: TestimonialsProps) => {
  const topRow = useMemo(
    () => testimonials.filter((_, i) => i % 2 === 0),
    [testimonials]
  );
  const bottomRow = useMemo(
    () => testimonials.filter((_, i) => i % 2 !== 0),
    [testimonials]
  );

  return (
    <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 uppercase">
            {subtitle}
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </p>
        </div>

        <div className="my-10">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: [0, 0, 1, 1],
            }}
          >
            {[...topRow, ...topRow].map((t, index) => (
              <motion.div
                key={`top-${t.id}-${index}`}
                className="min-w-[300px] bg-white p-6 rounded-xl shadow hover:shadow-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full mx-auto"
                  />
                ) : (
                  <div className="h-14 w-14 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-lg font-bold text-gray-700">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="mt-4 text-gray-800 italic text-center">
                  “{t.content}”
                </p>
                <div className="mt-4 text-center">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-blue-600 text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="my-10">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [0, 1000] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: [0, 0, 1, 1],
            }}
          >
            {[...bottomRow, ...bottomRow].map((t, index) => (
              <motion.div
                key={`bottom-${t.id}-${index}`}
                className="min-w-[300px] bg-white p-6 rounded-xl shadow hover:shadow-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full mx-auto"
                  />
                ) : (
                  <div className="h-14 w-14 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-lg font-bold text-gray-700">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="mt-4 text-gray-800 italic text-center">
                  “{t.content}”
                </p>
                <div className="mt-4 text-center">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-blue-600 text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
