import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Ksh 20,000",
    features: ["1-Page Website", "Basic SEO", "Mobile Friendly"],
  },
  {
    name: "Business",
    price: "Ksh 35,000",
    features: ["Up to 5 Pages", "SEO Optimization", "E-commerce Ready"],
  },
  {
    name: "Premium",
    price: "Ksh 50,000+",
    features: ["Custom Features", "Advanced SEO", "Full Branding"],
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
              className="p-6 border border-gray-700 rounded-lg bg-gray-900 hover:border-primary transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-primary text-2xl font-bold mt-2">
                {plan.price}
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
