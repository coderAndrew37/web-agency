import { Link } from "react-router-dom";

import { caseStudies } from "../data/caseStudies";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ecommerce Success Stories
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Real results from entrepreneurs who scaled their online stores with
            us.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy.slug}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {caseStudy.imageUrl ? (
                <img
                  className="w-full h-48 object-cover"
                  src={caseStudy.imageUrl}
                  alt={caseStudy.title}
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-48" />
              )}
              <div className="p-6">
                <div className="text-sm text-pink-600 font-semibold">
                  {caseStudy.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-gray-600">{caseStudy.description}</p>
                <div className="mt-6">
                  <Link
                    to={`/case-studies/${caseStudy.slug}`}
                    className="text-pink-600 font-medium hover:text-pink-800"
                  >
                    Read full case study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
