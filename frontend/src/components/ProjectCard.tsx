import React from "react";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description?: string;
  image?: string;
  liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  image,
  liveUrl,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white max-w-sm">
      {image && (
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            See Live <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
