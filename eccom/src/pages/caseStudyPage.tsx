// src/pages/CaseStudyPage.tsx
import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Case Study Not Found
        </h2>
        <Link to="/case-studies" className="text-blue-600 hover:underline">
          ← Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/case-studies" className="text-blue-600 hover:underline">
            ← Back to Case Studies
          </Link>
        </div>

        <div className="text-sm text-blue-600 font-semibold mb-2">
          {caseStudy.category}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">
          {caseStudy.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600">{caseStudy.description}</p>

        <div
          className="mt-6 text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />
      </div>
    </div>
  );
};

export default CaseStudyPage;
