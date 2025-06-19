import {
  BoltIcon,
  ChartBarIcon,
  SmartphoneIcon,
  UsersIcon,
} from "lucide-react";

const services = [
  {
    name: "Custom Coach Websites",
    description:
      "Beautiful, responsive websites tailored to your fitness brand and coaching style.",
    icon: SmartphoneIcon,
  },
  {
    name: "Client Management",
    description:
      "Integrated systems to manage clients, schedules, and progress tracking.",
    icon: UsersIcon,
  },
  {
    name: "Online Booking",
    description:
      "Let clients book sessions directly through your website 24/7.",
    icon: ChartBarIcon,
  },
  {
    name: "Performance Analytics",
    description:
      "Track your business growth and client progress with intuitive dashboards.",
    icon: BoltIcon,
  },
];

const Services = () => {
  return (
    <div id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Services
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need to Grow Your Coaching Business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            We provide comprehensive solutions designed specifically for fitness
            professionals.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md shadow-lg">
                        <service.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">
                      {service.description}
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

export default Services;
