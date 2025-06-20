import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="About - SleekSites"
        description="We're a Kenyan web agency helping coaches and ecommerce founders scale with fast, modern websites that convert."
        image="/preview.jpg"
        url="https://sleeksites.co.ke/about"
      />
      <main className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              About SleekSites
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We're a Kenyan web agency helping coaches and ecommerce founders
              scale with fast, modern websites that convert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-12">
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                At SleekSites, we’ve seen passionate business owners get stuck
                with generic templates and slow DIY tools that hold them back.
              </p>
              <p>
                That’s why we do things differently — combining strategy,
                beautiful design, and performance to build websites that get
                results.
              </p>
              <p>
                Whether you're selling coaching packages or managing an online
                store, we help you launch faster and grow smarter.
              </p>
              <p>
                We're not just here to build you a site — we're your tech
                partners, here to help you succeed online.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow-sm border text-gray-800 space-y-4">
              <h3 className="text-2xl font-bold text-blue-700">Quick Facts</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>🚀 Fast 5-day launches available</li>
                <li>🇰🇪 Proudly based in Nairobi, Kenya</li>
                <li>🤝 Strategy-first approach to every project</li>
                <li>🌍 Serving clients across East Africa & beyond</li>
              </ul>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <Link
              to="https://fitness.sleeksites.co.ke"
              className="block bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl border hover:shadow-lg transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                SleekSites for Coaches
              </h3>
              <p className="text-gray-700">
                Learn more about how we help coaches build conversion-optimized
                websites with booking systems and lead funnels.
              </p>
              <span className="text-blue-600 font-medium mt-2 inline-block">
                Visit fitness.sleeksites.co.ke →
              </span>
            </Link>

            <Link
              to="https://ecom.sleeksites.co.ke"
              className="block bg-gradient-to-br from-indigo-100 to-indigo-50 p-6 rounded-xl border hover:shadow-lg transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                SleekSites for Ecommerce
              </h3>
              <p className="text-gray-700">
                Ready to launch your online shop? We build lightning-fast stores
                with secure checkout, analytics, and more.
              </p>
              <span className="text-indigo-600 font-medium mt-2 inline-block">
                Visit ecom.sleeksites.co.ke →
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
