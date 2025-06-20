import { CheckCircleIcon } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: 44999,
    description: "Great for launching your first online store",
    features: [
      "Up to 50 product pages",
      "Mobile responsive design",
      "Secure checkout integration",
      "Social media links",
      "1-month free support",
      "Basic analytics",
      "Basic Admin Dashboard",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: 99999,
    description: "Perfect for growing ecommerce brands",
    features: [
      "Up to 100 product pages",
      "Inventory management",
      "Email marketing setup",
      "SEO optimization",
      "Analytics dashboard",
      "3 months free support",
      "Custom Admin Dashboard",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 149999,
    description: "For large businesses with advanced ecommerce needs",
    features: [
      "Unlimited product pages",
      "Custom integrations",
      "Multi-currency + shipping support",
      "Advanced analytics",
      "Custom admin dashboard",
      "24/7 support",
      "Advanced Email Campaigns Setup",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ecommerce Packages Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            No monthly fees. Just powerful online stores built to scale your
            business.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-white rounded-2xl shadow-sm border ${
                tier.popular
                  ? "border-indigo-500 ring-2 ring-indigo-500"
                  : "border-gray-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 py-1.5 px-4 bg-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                  Most popular
                </div>
              )}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    Ksh {tier.price.toLocaleString()}
                  </span>
                  <span className="text-base font-medium text-gray-600">
                    /one-time
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckCircleIcon
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="/contact"
                    className={`block w-full py-3 px-6 text-center rounded-md font-medium ${
                      tier.popular
                        ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:opacity-90"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
