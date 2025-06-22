import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  liveUrl: string;
  description: string;
}

const portfolioProjects: Project[] = [
  {
    title: "Jm Home Furniture",
    slug: "jm-home-furniture",
    category: "Ecommerce",
    imageUrl: "/images/ecom-site-preview.jpg",
    liveUrl: "https://jmhomefurniture.co.ke",
    description: "A funriture Ecommerce website",
  },
  {
    title: "Interiors By Tifi ",
    slug: "interiors-by-tifi",
    category: "Ecommerce",
    imageUrl: "/images/interiorsbytifi.jpg",
    liveUrl: "https://interiorsbytifi.co.ke",
    description: "An Interior Design Ecommerce website",
  },
  {
    title: "StrongFit Coaching",
    slug: "strongfit-coaching",
    category: "Fitness",
    imageUrl: "/images/fitness-site-preview.jpg",
    liveUrl: "https://fitness.sleeksites.co.ke",
    description: "A Fitness Coaching website",
  },
  // Add more...
];

const PortfolioList = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Portfolio
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
          See what we’ve built for ecommerce brands and online coaches
        </p>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.map((project) => (
          <div
            key={project.slug}
            className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {project.description}
              </p>
              <Link
                to={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
              >
                View Live <ExternalLinkIcon className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
