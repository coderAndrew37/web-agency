import { Link } from "react-router-dom";
import { calendlyUrl } from "../config/constants";

const Services = () => {
  return (
    <main className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            What We Build
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We craft beautiful, strategic websites that help your business grow
            — fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Fitness */}
          <div className="bg-blue-50 rounded-xl p-8 border shadow-sm text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Websites for Coaches
            </h2>
            <p className="text-gray-700 mb-4">
              Designed for fitness trainers, wellness pros, and service-based
              coaches. Booking systems, lead capture, and conversion-driven
              design — all done for you.
            </p>
            <Link
              to="https://fitness.sleeksites.co.ke"
              className="text-blue-700 font-medium hover:underline"
              target="_blank"
            >
              Explore Fitness Solutions →
            </Link>
          </div>

          {/* Ecommerce */}
          <div className="bg-indigo-50 rounded-xl p-8 border shadow-sm text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Ecommerce Websites
            </h2>
            <p className="text-gray-700 mb-4">
              Fast, scalable online stores built to grow. Whether you're just
              launching or migrating from Instagram sales, we help you build a
              full shop that works for you.
            </p>
            <Link
              to="https://ecom.sleeksites.co.ke"
              className="text-indigo-700 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Ecommerce Solutions →
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Not sure which fits your business?
          </p>
          <Link
            to={calendlyUrl}
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Services;
