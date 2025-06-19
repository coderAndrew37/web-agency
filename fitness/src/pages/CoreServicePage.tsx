import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { coreServices } from "../data/coreServices";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { testimonials } from "../data/testimonials";

const CoreServicePage = () => {
  const { slug } = useParams();
  const service = coreServices.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Core Coaching Solution`;
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Service not found.</p>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="bg-white">
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Icon className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{service.description}</p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {service.details?.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {service.benefits?.title || "Why You Need This"}
            </h2>
            <p className="text-gray-700 mb-4">
              {service.benefits?.description}
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {service.benefits?.details?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {service.howItHelps?.title || "How It Helps You"}
            </h2>
            <p className="text-gray-700 mb-4">
              {service.howItHelps?.description}
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {service.howItHelps?.details?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {service.pricing?.title || "Pricing"}
            </h2>
            <p className="text-gray-700 mb-4">{service.pricing?.description}</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {service.pricing?.details?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What's Included
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <Testimonials
          testimonials={testimonials}
          title="Hear from Other Coaches"
          subtitle="Success Stories"
        />
      </div>

      <div className="py-20">
        <CTA
          title="Ready to Take the Next Step?"
          description="Let's build your business together with our expert support."
          primaryButton={{ text: "Get Started", link: "/contact" }}
          secondaryButton={{ text: "View Pricing", link: "/pricing" }}
        />
      </div>
    </div>
  );
};

export default CoreServicePage;
