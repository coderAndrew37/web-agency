import React from "react";

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeaturesProps {
  features: Feature[];
  title: string;
  subtitle?: string;
  description?: string;
  bgColor?: string;
  id?: string;
}

const Features: React.FC<FeaturesProps> = ({
  features,
  title,
  subtitle,
  description,
  bgColor = "bg-white",
}) => {
  return (
    <div id="features" className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {subtitle && (
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              {subtitle}
            </h2>
          )}
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </p>
          {description && (
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">
                      {feature.description}
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

export default Features;
