// src/components/FeaturesSection.tsx
import {
  RefreshCwIcon,
  ZapIcon,
  ShieldIcon,
  SmartphoneIcon,
} from "lucide-react";
import featureImage from "../assets/feature-image.webp";

const defaultFeatures = [
  {
    icon: RefreshCwIcon,
    title: "Automatic updates–100% hassle-free",
    description: "No updating, patches or management needed",
  },
  {
    icon: ZapIcon,
    title: "Blazingly fast loading with 99.9% uptime",
    description:
      "All websites are hosted on Amazon Cloud servers with 99.9% uptime guaranteed",
  },
  {
    icon: ShieldIcon,
    title: "Ironclad security",
    description: "Secure websites with included SSL certificate",
  },
  {
    icon: SmartphoneIcon,
    title: "Optimised for mobile and SEO",
    description:
      "Mobile friendly websites that are optimised for search engines right out of the box",
  },
];

const FeaturesSection = ({ features = defaultFeatures }) => (
  <div>
    <div className="mb-8 text-center">
      <img
        src={featureImage}
        alt="Feature illustration"
        className="mx-auto w-full max-w-4xl rounded-lg shadow-md"
      />
    </div>

    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white">
              <feature.icon className="h-8 w-8" />
            </div>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-gray-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesSection;
