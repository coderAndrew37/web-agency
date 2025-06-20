import { BarChart2Icon } from "lucide-react";
import statsImage from "../assets/stats-image.webp";

const StatsSection = () => (
  <div className="mt-24 bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="px-6 py-8 sm:p-10">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900">
          Real Results for Fitness Coaches
        </h3>
        <p className="mt-2 text-gray-600">
          See how our websites help coaches grow their businesses
        </p>
        <div className="mt-6">
          <img
            src={statsImage}
            alt="Stats illustration"
            className="mx-auto w-full max-w-3xl rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="text-center">
          <p className="text-5xl font-extrabold text-blue-600">2K+</p>
          <p className="mt-2 text-lg font-medium text-gray-900">Engagement</p>
          <p className="mt-1 text-gray-600">Monthly client interactions</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-extrabold text-blue-600">32,745</p>
          <p className="mt-2 text-lg font-medium text-gray-900">Site Visits</p>
          <div className="mt-2 flex items-center justify-center text-green-500">
            <BarChart2Icon className="h-5 w-5 mr-1" />
            <span>34.5% increase</span>
          </div>
          <p className="mt-1 text-gray-600 text-sm">Last 30 days</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-extrabold text-blue-600">360+</p>
          <p className="mt-2 text-lg font-medium text-gray-900">Clients</p>
          <p className="mt-1 text-gray-600">
            Successful coaches using our websites
          </p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
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
);

export default StatsSection;
