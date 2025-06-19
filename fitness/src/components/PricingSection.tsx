import { CheckCircleIcon } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: 24_999,
    description: "Perfect for new coaches starting their online journey",
    features: [
      "Custom 5-page website",
      "Mobile responsive design",
      "Basic contact form",
      "Social media integration",
      "1-month free support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: 49_999,
    description: "Everything you need to establish your coaching brand",
    features: [
      "Custom 10-page website",
      "Online booking system",
      "Client portal",
      "Email marketing setup",
      "3 months free support",
      "SEO optimization",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99_999,
    description: "For established coaches with complex business needs",
    features: [
      "Unlimited pages",
      "Custom integrations",
      "Membership portal",
      "E-commerce functionality",
      "6 months free support",
      "Advanced analytics",
      "Priority support",
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
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            No hidden fees. Everything you need to build your fitness coaching
            business online.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-white rounded-2xl shadow-sm border ${
                tier.popular
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
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
                    href={tier.popular ? "/contact" : "/contact"}
                    className={`block w-full py-3 px-6 text-center rounded-md font-medium ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90"
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
