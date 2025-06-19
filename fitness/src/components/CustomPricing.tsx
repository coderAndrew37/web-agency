import { MailIcon, PhoneIcon } from "lucide-react";
import React from "react";
import customImage from "../assets/custom-image.webp";

const CustomPricing: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Need something custom?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We understand that every fitness business is unique. If our
              standard packages don't quite fit your needs, we'll create a
              custom solution tailored specifically for your coaching business.
            </p>

            <div className="mt-6 mb-8">
              <img
                src={customImage}
                alt="Custom pricing illustration"
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <MailIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Email us
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    <a
                      href="mailto:solutions@sleeksites.co.ke"
                      className="text-blue-600 hover:underline"
                    >
                      solutions@sleeksites.co.ke
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Call us</h3>
                  <p className="mt-2 text-base text-gray-600">
                    <a
                      href="tel:+254712345678"
                      className="text-blue-600 hover:underline"
                    >
                      +254 712 345 678
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-2xl font-bold text-gray-900">
                  Request a Custom Quote
                </h3>
                <p className="mt-2 text-gray-600">
                  Tell us about your specific requirements and we'll prepare a
                  tailored proposal.
                </p>

                <form className="mt-6 space-y-6">
                  {/* Inputs */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      placeholder="Tell us about your coaching business and what you need..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-6 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90"
                    >
                      Request Custom Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPricing;
