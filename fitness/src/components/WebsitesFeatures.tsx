import {
  BarChart2Icon,
  RefreshCwIcon,
  ShieldIcon,
  SmartphoneIcon,
  ZapIcon,
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
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

  return (
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

        {/* Stats section */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900">
                Real Results for Fitness Coaches
              </h3>
              <p className="mt-2 text-gray-600">
                See how our websites help coaches grow their businesses
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-blue-600">2K+</p>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  Engagement
                </p>
                <p className="mt-1 text-gray-600">
                  Monthly client interactions
                </p>
              </div>

              <div className="text-center">
                <p className="text-5xl font-extrabold text-blue-600">32,745</p>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  Site Visits
                </p>
                <div className="mt-2 flex items-center justify-center text-green-500">
                  <BarChart2Icon className="h-5 w-5 mr-1" />
                  <span>34.5% increase</span>
                </div>
                <p className="mt-1 text-gray-600 text-sm">Last 30 days</p>
              </div>

              <div className="text-center">
                <p className="text-5xl font-extrabold text-blue-600">360+</p>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  Clients
                </p>
                <p className="mt-1 text-gray-600">
                  Successful coaches using our websites
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600">Last updated: 23 July, 2023</p>
                <div className="mt-4 sm:mt-0 flex space-x-4">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    Last 7 days
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Last 30 days
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
