interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
}

interface PortfolioProps {
  projects: Project[];
}

const Portfolio = ({ projects }: PortfolioProps) => (
  <section id="portfolio" className="py-12 px-4 md:px-8 lg:px-16 bg-white">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
      Our Work
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-md overflow-hidden bg-gray-50 hover:shadow-lg transition-shadow"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                View Live
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Portfolio;
