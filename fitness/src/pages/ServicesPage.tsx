import {
  MailIcon,
  MonitorIcon,
  PaintbrushIcon,
  RocketIcon,
} from "lucide-react";
import CTA from "../components/CTA";
import ServiceCard from "../components/ServiceCard";
import ServiceHero from "../components/ServiceHero";
import { coreServices } from "../data/coreServices";

const ServicesPage = () => {
  const number = 254746577838;

  const addonServices = [
    {
      icon: MailIcon,
      title: "Lead Magnets",
      description:
        "Create irresistible free offers to capture email leads and build your coaching list.",
      price: "From KES 2,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Lead%20Magnets`,
    },
    {
      icon: PaintbrushIcon,
      title: "Logo & Brand Design",
      description:
        "Professional branding that establishes your unique identity in the fitness industry.",
      price: "From KES 9,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Logo%20%26%20Brand%20Design`,
    },
    {
      icon: RocketIcon,
      title: "Facebook & Google Ads",
      description:
        "Targeted advertising campaigns to reach your ideal clients and grow your coaching business.",
      price: "From KES 19,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Facebook%20%26%20Google%20Ads`,
    },
    {
      icon: MonitorIcon,
      title: "Performance Analytics",
      description:
        "Track and measure your business growth with custom analytics dashboards.",
      price: "From KES 1,499/month",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Performance%20Analytics`,
    },
  ];

  return (
    <div className="bg-white">
      <ServiceHero
        title="All-In-One Solutions for Fitness Coaches"
        subtitle="Our Services"
        description="We provide everything you need to build, grow, and scale your coaching business - from websites to marketing automations."
      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Core Coaching Solutions
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Comprehensive services designed specifically for fitness
            professionals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {coreServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              isCore={true}
              slug={service.slug}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Premium Add-On Services
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Enhance your coaching business with our specialized services
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {addonServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
                      <service.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-gray-900 text-center">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-600 text-center">
                    {service.description}
                  </p>
                  <div className="mt-6 text-center">
                    <span className="text-xl font-bold text-blue-600">
                      {service.price}
                    </span>
                  </div>
                  <div className="mt-6">
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="w-full py-2 px-4 border border-blue-600 rounded-md text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                        Learn More
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTA
        title="Ready to Grow Your Coaching Business?"
        description="Get all-in-one solutions designed specifically for fitness professionals"
        primaryButton={{ text: "Get Started", link: "/contact" }}
        secondaryButton={{ text: "View Pricing", link: "/pricing" }}
      />
    </div>
  );
};

export default ServicesPage;
