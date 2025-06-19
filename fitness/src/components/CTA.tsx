import { Link } from "react-router-dom";
import React from "react";

interface CallToActionProps {
  title: string;
  description: string;
  primaryButton: {
    link: string;
    text: string;
  };
  secondaryButton?: {
    link: string;
    text: string;
  };
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-blue-100">{description}</p>
          <div className="mt-8 flex justify-center">
            <div className="rounded-md shadow">
              <Link
                to={primaryButton.link}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                {primaryButton.text}
              </Link>
            </div>
            {secondaryButton && (
              <div className="ml-3">
                <Link
                  to={secondaryButton.link}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
                >
                  {secondaryButton.text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
