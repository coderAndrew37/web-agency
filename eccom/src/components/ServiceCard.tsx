import React from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features?: string[];
  isCore: boolean;
  slug?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  isCore,
  slug,
}) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
        isCore ? "border-t-4 border-blue-600" : ""
      }`}
    >
      <div className="px-6 py-8 bg-white">
        <div className="flex justify-center mb-6">
          <div
            className={`flex items-center justify-center h-16 w-16 rounded-full ${
              isCore
                ? "bg-blue-100 text-blue-600"
                : "bg-indigo-100 text-indigo-600"
            }`}
          >
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
        </div>

        {features && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Includes:
            </h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 text-center">
          {isCore ? (
            <Link to={`/services/${slug}`}>
              <button className="px-6 py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90">
                View Details
              </button>
            </Link>
          ) : (
            <button className="px-6 py-3 font-medium rounded-lg bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">
              Add to Package
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
