import React from "react";

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepProps {
  steps: Step[];
  title: string;
  bgColor?: string;
}

const Steps: React.FC<StepProps> = ({ steps, title, bgColor = "bg-white" }) => {
  return (
    <div className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="hidden md:block absolute h-full w-0.5 bg-blue-200 left-1/2 transform -translate-x-1/2"></div>

            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0">
              {steps.map((step, index) => {
                const IconComponent = step.icon;

                return (
                  <div
                    key={index}
                    className={`relative ${
                      index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="flex items-center md:block">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                        {index + 1}
                      </div>

                      <div
                        className={`ml-4 md:ml-0 ${
                          index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                        }`}
                      >
                        {IconComponent && (
                          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600">
                            <IconComponent className="h-6 w-6" />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900 mt-2">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
