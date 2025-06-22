import { Link } from "react-router-dom";
import { XCircleIcon } from "lucide-react";
import { calendlyUrl } from "../config/constants";

const painPoints = [
  "You’ve tried setting up your online store but keep running into tech issues.",
  "You’re stuck selling on Instagram or WhatsApp without a real shop.",
  "Customers ask if you even have a website.",
  "You know your current site isn’t making enough sales.",
  "You keep putting off launching your ecommerce site because it's overwhelming.",
];

const ThisSoundFamiliar = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-yellow-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Sound Familiar?
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          If any of these feel true for you, it's time to launch properly.
        </p>

        <ul className="mt-6 space-y-4 text-left">
          {painPoints.map((point, idx) => (
            <li key={idx} className="flex items-start">
              <XCircleIcon className="text-pink-600 w-5 h-5 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-lg text-gray-700">
          Not quite ready for a full ecommerce setup? No worries — we have
          starter options.
        </p>
        <Link
          to="/website-in-a-week"
          className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
        >
          Learn about Website in a Week
        </Link>
        <p className="mt-6 text-lg text-gray-700">
          Or if you're ready to go all in now...
        </p>
        <Link
          to={calendlyUrl}
          target="_blank"
          className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Book a Free Discovery Call
        </Link>
      </div>
    </section>
  );
};

export default ThisSoundFamiliar;
