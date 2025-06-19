import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    title: "How a Personal Trainer Doubled Client Base in 3 Months",
    description:
      "Discover how Sarah Johnson transformed her fitness business with a professional website and online booking system.",
    category: "Personal Training",
    imageUrl: null,
  },
  {
    id: 2,
    title: "From Studio to Online: A Yoga Instructor's Journey",
    description:
      "Learn how Michael Brown expanded his reach beyond his local studio with a beautiful website and virtual classes.",
    category: "Yoga",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Building a Nutrition Coaching Empire Online",
    description:
      "See how Emily Davis scaled her one-on-one coaching to group programs with a membership website.",
    category: "Nutrition",
    imageUrl: null,
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Case Studies
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Real stories from fitness coaches who transformed their businesses
            with our websites.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy.id}
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
                <div className="text-sm text-blue-600 font-semibold">
                  {caseStudy.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-gray-600">{caseStudy.description}</p>
                <div className="mt-6">
                  <Link
                    to={`/case-studies/${caseStudy.id}`}
                    className="text-blue-600 font-medium hover:text-blue-800"
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
