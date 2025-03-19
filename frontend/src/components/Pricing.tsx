import PricingCard from "./PricingCard";

interface Plan {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

interface PricingProps {
  title?: string;
  plans: Plan[];
}

const Pricing = ({ title = "Pricing Plans", plans }: PricingProps) => {
  return (
    <section id="pricing" className="py-20 text-center bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
