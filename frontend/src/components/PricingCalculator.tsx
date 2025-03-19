import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  name: string;
  price: number;
}

interface PricingCalculatorProps {
  features: Feature[];
  basePrice: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  features,
  basePrice,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const toggleFeature = (feature: string, price: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );

    setTotalPrice((prevTotal) =>
      selectedFeatures.includes(feature) ? prevTotal - price : prevTotal + price
    );
  };

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

  return (
    <section
      ref={sectionRef}
      className="py-16 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <h2 className="text-4xl font-bold mb-6">Customize Your Package</h2>
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

      <button className="mt-6 px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:opacity-80 transition">
        Get Started 🚀
      </button>
    </section>
  );
};

export default PricingCalculator;
