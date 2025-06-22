// src/components/WebsiteInAWeek.tsx
import { Link } from "react-router-dom";
import heroImage from "../assets/website-in-a-week.jpeg";

const whatsappLink =
  "https://wa.me/254746577838?text=Hey%2C%20I'm%20interested%20in%20Eccomerce%20Website%20in%20a%20Week.";

const WebsiteInAWeek = () => {
  return (
    <section className="bg-indigo-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          On a Budget? Introducing{" "}
          <span className="text-blue-600">Website in a Week</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg text-gray-600">
            Not ready for a custom website yet? No problem! Our Website in a
            Week package is perfect for busy entrepreneurs who want a
            professionally designed site based on our proven templates —
            launched in just 5 days.
          </p>
          <p className="mt-6 text-lg text-gray-600">
            If you're interested in upgrading to a custom website, you can
            always{" "}
            <Link to="/pricing" className="text-blue-600 hover:underline">
              check out our custom websites section
            </Link>
            .
          </p>

          <p className="mt-6 text-2xl font-bold text-blue-700">Ksh 25,000</p>

          <Link
            to={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        <div className="w-full">
          <img
            src={heroImage}
            alt="Website in a week preview"
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WebsiteInAWeek;
