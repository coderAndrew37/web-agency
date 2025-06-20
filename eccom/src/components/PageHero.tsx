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
}: PageHeroProps) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-16 bg-transparent md:py-20 lg:py-28">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:max-w-4xl">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl">
                  <span className="block">{title}</span>
                  {subtitle && (
                    <span className="block text-blue-600 mt-2">{subtitle}</span>
                  )}
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="rounded-md shadow">
                    <Link
                      to={primaryButton.link}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 md:py-4 md:text-lg md:px-10"
                    >
                      {primaryButton.text}
                    </Link>
                  </div>
                  {secondaryButton && (
                    <div className="ml-3">
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
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3">
        <div className="h-56 w-full bg-gray-200 rounded-lg sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default PageHero;
