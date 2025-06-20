import { Link } from "react-router-dom";
import { BriefcaseIcon, DumbbellIcon } from "lucide-react";

const services = [
  {
    title: "Fitness Coaches",
    description:
      "Custom websites tailored for personal trainers, yoga instructors, and wellness professionals.",
    icon: DumbbellIcon,
    link: "https://fitness.sleeksites.co.ke",
  },
  {
    title: "Ecommerce Brands",
    description:
      "Scalable, fast-loading online stores that convert visitors into loyal customers.",
    icon: BriefcaseIcon,
    link: "https://ecom.sleeksites.co.ke",
  },
];

const ServiceOverview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Who We Build For
        </h2>
        <p className="max-w-xl mx-auto text-lg text-gray-600 mb-12">
          Whether you're selling a service or a product, SleekSites helps you
          build a website that drives results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map(({ title, description, icon: Icon, link }) => (
            <div
              key={title}
              className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                <Icon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <Link
                to={link}
                className="text-blue-600 font-medium hover:underline"
              >
                Visit →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
