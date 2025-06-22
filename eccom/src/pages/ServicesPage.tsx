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
import { calendlyUrl } from "../config/constants";

const ServicesPage = () => {
  const number = 254746577838;

  const addonServices = [
    {
      icon: MailIcon,
      title: "Email Marketing",
      description:
        "Automated email sequences and newsletters to boost retention and repeat sales.",
      price: "From KES 3,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Email%20Marketing`,
    },
    {
      icon: PaintbrushIcon,
      title: "Brand Identity Design",
      description:
        "Unique logo, colors, and design language that sets your ecommerce brand apart.",
      price: "From KES 9,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Brand%20Identity%20Design`,
    },
    {
      icon: RocketIcon,
      title: "Paid Ads Setup",
      description:
        "Launch high-converting Facebook, Instagram & Google ad campaigns to scale sales.",
      price: "From KES 14,999",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Paid%20Ads%20Setup`,
    },
    {
      icon: MonitorIcon,
      title: "Sales Analytics Dashboard",
      description:
        "Monitor revenue, top-selling products, and marketing performance in one view.",
      price: "From KES 1,499/month",
      link: `https://wa.me/${number}?text=Hi%20I'm%20interested%20in%20Sales%20Analytics%20Dashboard`,
    },
  ];

  return (
    <div className="bg-white">
      <ServiceHero
        title="Complete Ecommerce Services"
        subtitle="Our Services"
        description="Everything you need to build, launch, and scale your online store — from website setup to digital marketing."
      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Core Ecommerce Solutions
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Powerful features crafted to launch and grow your store.
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
              Add-On Services
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Boost your ecommerce growth with our specialized add-ons.
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
        title="Launch and Scale Your Store With Ease"
        description="Partner with experts who understand ecommerce — from product setup to profit."
        primaryButton={{
          text: "Start Now",
          link: calendlyUrl,
          target: "_blank",
        }}
        secondaryButton={{ text: "Explore Plans", link: "/pricing" }}
      />
    </div>
  );
};

export default ServicesPage;
