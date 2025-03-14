import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Ksh 20,000",
    features: ["1-Page Website", "Basic SEO", "Mobile Friendly"],
    highlight: false,
  },
  {
    name: "Business",
    price: "Ksh 35,000",
    features: ["Up to 5 Pages", "SEO Optimization", "E-commerce Ready"],
    highlight: true, // This plan will be visually emphasized
  },
  {
    name: "Premium",
    price: "Ksh 50,000+",
    features: ["Custom Features", "Advanced SEO", "Full Branding"],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-dark text-light text-center">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pricing Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 border rounded-xl shadow-lg bg-gray-900 transition ${
                plan.highlight
                  ? "border-primary scale-105 shadow-primary/50"
                  : "border-gray-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-primary text-3xl font-bold mt-2">
                {plan.price}
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-center gap-2"
                  >
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 px-6 py-3 bg-primary text-dark font-semibold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition">
                Book Now <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
