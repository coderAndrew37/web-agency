import FeaturesSection from "./WebsitesFeatures";
import StatsSection from "./StatsSection";

const FeaturesGrid = () => (
  <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
          Why Choose Us
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Professional Websites Built for Results
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
          We handle all the technical details so you can focus on what you do
          best - coaching
        </p>
      </div>

      <FeaturesSection />
      <StatsSection />
    </div>
  </div>
);

export default FeaturesGrid;
