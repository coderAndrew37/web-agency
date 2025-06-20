import { CheckCircleIcon } from "lucide-react";

const benefits = [
  {
    title: "Lightning-Fast Performance",
    description:
      "We build blazing fast websites that load in seconds and keep visitors engaged.",
  },
  {
    title: "Results That Matter",
    description:
      "More leads, more conversions, more revenue — our sites are designed to perform.",
  },
  {
    title: "Ongoing Support",
    description:
      "We don’t disappear after launch. Count on us for updates, fixes, and expert help.",
  },
  {
    title: "High ROI",
    description:
      "Get the most from your website investment with modern tools and strategy.",
  },
];

const portfolioItems = [
  {
    title: "StrongFit Coaching",
    category: "Fitness",
    imageUrl: "/images/fitness-site-preview.jpg",
  },
  {
    title: "GlowSkincare Store",
    category: "Ecommerce",
    imageUrl: "/images/ecom-site-preview.jpg",
  },
  {
    title: "CoreFuel Nutrition",
    category: "Fitness",
    imageUrl: "/images/nutrition-site-preview.jpg",
  },
];

const GeneralHero = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Strategic Websites for Coaches & Ecommerce Brands
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            SleekSites designs high-performing websites that help you stand out,
            attract more customers, and scale with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://fitness.sleeksites.co.ke"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:opacity-90"
            >
              Explore Fitness Solutions
            </a>
            <a
              href="https://ecom.sleeksites.co.ke"
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50"
            >
              Explore Ecommerce Solutions
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Why Choose SleekSites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {benefits.map((item) => (
              <div key={item.title} className="text-left">
                <div className="flex items-center text-blue-600 mb-2">
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Our Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Explore some of the results we've delivered for coaches and
            ecommerce businesses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="bg-white shadow rounded-lg overflow-hidden border"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <div className="text-sm text-blue-600 font-semibold mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { GeneralHero };
