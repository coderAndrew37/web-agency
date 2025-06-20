import {
  ShoppingCartIcon,
  GlobeIcon,
  CreditCardIcon,
  TrendingUpIcon,
} from "lucide-react";

const services = [
  {
    name: "Custom Online Stores",
    description:
      "Fast, responsive ecommerce websites tailored to your products and brand.",
    icon: ShoppingCartIcon,
  },
  {
    name: "Payment Integration",
    description:
      "Accept M-Pesa, card payments, and more — securely and smoothly.",
    icon: CreditCardIcon,
  },
  {
    name: "Multi-Channel Sales",
    description:
      "Sell across Instagram, Facebook, WhatsApp, and Google with synced inventory.",
    icon: GlobeIcon,
  },
  {
    name: "Sales Analytics",
    description:
      "Visual dashboards to track revenue, orders, top products and growth trends.",
    icon: TrendingUpIcon,
  },
];

const Services = () => {
  return (
    <div id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Services
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need to Run and Scale Your Shop
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            From store setup to automation — we handle the tech so you can focus
            on sales.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md shadow-lg">
                        <service.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
