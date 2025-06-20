// src/components/ServiceHero.tsx
import React from "react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-base font-semibold text-blue-600 tracking-wide uppercase mb-4">
          {subtitle}
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-600">{description}</p>
      </div>
    </section>
  );
};

export default ServiceHero;
