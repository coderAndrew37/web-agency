const resources = [
  {
    id: 1,
    title: "The Ultimate Guide to Online Fitness Coaching",
    description:
      "Learn how to transition from in-person to online coaching and scale your business.",
    type: "eBook",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Client Onboarding Checklist",
    description:
      "A step-by-step checklist to onboard new clients professionally and efficiently.",
    type: "Checklist",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Social Media Content Calendar for Fitness Coaches",
    description:
      "A 30-day content plan with post ideas for Instagram, Facebook, and Twitter.",
    type: "Template",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Website Copywriting Guide for Coaches",
    description:
      "Learn how to write compelling website copy that converts visitors into clients.",
    type: "Guide",
    downloadLink: "#",
  },
];

const FreeResources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Free Resources for Fitness Coaches
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Download our free guides, templates, and checklists to help grow
            your coaching business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
            >
              <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-blue-600 font-semibold mb-2">
                  {resource.type}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {resource.description}
                </p>
                <a
                  href={resource.downloadLink}
                  className="mt-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 rounded-md text-center font-medium hover:opacity-90 transition-opacity"
                >
                  Download Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want More Resources?
          </h2>
          <p className="text-blue-100 mb-6">
            Join our newsletter to get exclusive resources and tips delivered to
            your inbox every month.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-l-md focus:outline-none"
            />
            <button className="bg-white text-blue-600 py-3 px-6 rounded-r-md font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeResources;
