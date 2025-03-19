import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import colors from "../styles/colors";
import { pricingSchema } from "../Utils/validationSchemas";
gsap.registerPlugin(ScrollTrigger);

interface Feature {
  name: string;
  price: number;
}

interface PricingCalculatorProps {
  title: string;
  features: Feature[];
  basePrice: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  title,
  features,
  basePrice,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      email: "",
      selectedFeatures: [],
      totalPrice: basePrice,
    },
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".feature-item"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const toggleFeature = (feature: string, price: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );

    setTotalPrice((prevTotal) =>
      selectedFeatures.includes(feature) ? prevTotal - price : prevTotal + price
    );

    setValue("selectedFeatures", selectedFeatures);
    setValue("totalPrice", totalPrice);
  };

  const onSubmit = async (data: {
    email: string;
    selectedFeatures: string[];
    totalPrice: number;
  }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/pricing`, data);
      alert("Request submitted successfully! 🎉");
    } catch (error) {
      console.error("Error submitting pricing request:", error);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg text-gray-500 mb-6">
        Select the features you need:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {features.map((feature) => (
          <button
            key={feature.name}
            onClick={() => toggleFeature(feature.name, feature.price)}
            className={`feature-item flex justify-between px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
              selectedFeatures.includes(feature.name)
                ? "bg-primary text-white scale-105 shadow-lg"
                : "border-gray-500 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{feature.name}</span>
            <span>+Ksh {feature.price.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-3xl font-bold">
        Total Price:{" "}
        <span style={{ color: colors.primary }}>
          Ksh {totalPrice.toLocaleString()}
        </span>
      </div>

      {/* ✅ Add User Email for Booking */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-500 rounded-md focus:border-primary"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 mt-2">{errors.email.message as string}</p>
        )}

        {errors.selectedFeatures && (
          <p className="text-red-500 mt-2">
            {errors.selectedFeatures.message as string}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 px-8 py-3 bg-primary text-blue-700 text-lg font-bold rounded-full shadow-md hover:opacity-80 transition"
        >
          Get Started 🚀
        </button>
      </form>
    </section>
  );
};

export default PricingCalculator;
