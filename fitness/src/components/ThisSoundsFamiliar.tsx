import { Link } from "react-router-dom";
import { XCircleIcon } from "lucide-react";
import { calendlyUrl } from "../config/constants";

const painPoints = [
  "You’ve spent weeks trying to build your website but it still doesn’t look right.",
  "You're overwhelmed by tech and unsure where to start.",
  "Clients say they can't find you online.",
  "You know your site doesn’t reflect the quality of your coaching.",
  "You're losing potential clients to competitors with better websites.",
];

const ThisSoundFamiliar = () => {
  return (
    <section className="bg-gradient-to-br from-red-50 to-pink-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Still Unsure?
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          If any of these sound like you, it's time to take the next step.
        </p>

        <ul className="mt-6 space-y-4 text-left">
          {painPoints.map((point, idx) => (
            <li key={idx} className="flex items-start">
              <XCircleIcon className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-lg text-gray-700">
          Not quite ready to commit to a full custom site? No worries — we’ve
          got you covered.
        </p>
        <Link
          to="/website-in-a-week"
          className="mt-4 inline-block text-blue-600 font-medium hover:underline"
        >
          Learn more about Website in a Week
        </Link>
        <p className="mt-6 text-lg text-gray-700">
          Or if you're ready to take action right now...
        </p>
        <Link
          to={calendlyUrl}
          target="_blank"
          className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Book a Free Discovery Call
        </Link>
      </div>
    </section>
  );
};

export default ThisSoundFamiliar;
