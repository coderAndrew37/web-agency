import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

const PageHero = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  image,
}: PageHeroProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl">
              <span className="block">{title}</span>
              {subtitle && (
                <span className="block text-blue-600 mt-2">{subtitle}</span>
              )}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to={primaryButton.link}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 md:py-4 md:text-lg md:px-10"
                >
                  {primaryButton.text}
                </Link>
              </div>
              {secondaryButton && (
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <Link
                    to={secondaryButton.link}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    {secondaryButton.text}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Image Column */}
          {image && (
            <div className="w-full h-auto">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover rounded-lg shadow-lg max-h-[500px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
