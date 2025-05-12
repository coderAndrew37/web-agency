// components/PricingCalculator.tsx
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookNowModal from "./BookNowModal";
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
  basePrice?: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  title = "Customize Your Plan",
  features,
  basePrice = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
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

  const toggleFeature = (feature: string) => {
    const newSelectedFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];

    setSelectedFeatures(newSelectedFeatures);

    const newTotalPrice = newSelectedFeatures.reduce((sum, featureName) => {
      const feature = features.find((f) => f.name === featureName);
      return sum + (feature?.price || 0);
    }, basePrice);

    setTotalPrice(newTotalPrice);
    setValue("selectedFeatures", newSelectedFeatures);
    setValue("totalPrice", newTotalPrice);
  };

  const onSubmit = () => {
    setIsModalOpen(true);
    reset();
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg text-gray-500 mb-6">
        Build your perfect package by selecting the features you need:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {features.map((feature) => (
          <button
            key={feature.name}
            type="button"
            onClick={() => toggleFeature(feature.name)}
            className={`feature-item flex justify-between px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
              selectedFeatures.includes(feature.name)
                ? "bg-primary text-gray-500 scale-105 shadow-lg line-through"
                : "border-gray-500 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{feature.name}</span>
            <span>+Ksh {feature.price.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-3xl font-bold">
        Your Custom Price:{" "}
        <span style={{ color: colors.primary }}>
          Ksh {totalPrice.toLocaleString()}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email to continue"
          className="w-full px-4 py-3 border border-gray-500 rounded-md focus:border-primary"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 mt-2">{errors.email.message as string}</p>
        )}

        <button
          type="submit"
          disabled={selectedFeatures.length === 0}
          className={`mt-4 px-8 py-3 text-lg font-bold rounded-full shadow-md transition ${
            selectedFeatures.length > 0
              ? "bg-primary text-blue-500 hover:text-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Get Started 🚀
        </button>
      </form>

      <BookNowModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        userData={{
          email: "",
          selectedPlan: `Custom Package (Ksh ${totalPrice.toLocaleString()})`,
          description: `Selected features:\n${selectedFeatures.join("\n")}`,
        }}
      />
    </section>
  );
};

export default PricingCalculator;
