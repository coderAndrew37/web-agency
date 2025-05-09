import { useCalendly } from "../hooks/integrations/useCalendly";
import colors from "../styles/colors";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  backgroundColor?: string;
  calendlyUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const Hero = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  backgroundColor = colors.background,
  calendlyUrl,
  imageUrl,
  imageAlt = "Hero image",
}: HeroProps) => {
  const { openCalendly } = useCalendly();

  const handlePrimaryClick = () => {
    if (primaryButtonAction) return primaryButtonAction();
    if (calendlyUrl) return openCalendly(calendlyUrl);
    console.warn(
      "No primaryButtonAction or calendlyUrl provided for Hero component."
    );
  };

  const isTwoColumn = !!imageUrl;

  return (
    <section
      className="hero relative min-h-screen flex items-center px-6 pt-20 md:pt-32"
      style={{ backgroundColor, color: colors.darkText }}
    >
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto ${
          isTwoColumn
            ? "grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            : "flex flex-col items-center text-center"
        }`}
      >
        <div
          className={`${isTwoColumn ? "text-left" : "text-center"} max-w-2xl`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight text-balance">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 text-balance">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-start items-center gap-4">
            <button
              className="w-full sm:w-auto px-6 py-3 font-bold text-base sm:text-lg rounded-full shadow-md hover:opacity-90 transition cursor-pointer"
              style={{ backgroundColor: colors.primary, color: "#fff" }}
              onClick={handlePrimaryClick}
            >
              {primaryButtonText}
            </button>
            {secondaryButtonText && secondaryButtonAction && (
              <button
                className="w-full sm:w-auto px-6 py-3 border-2 font-bold text-base sm:text-lg rounded-full hover:opacity-80 transition cursor-pointer"
                style={{
                  borderColor: colors.primary,
                  color: colors.darkText,
                  backgroundColor: "transparent",
                }}
                onClick={secondaryButtonAction}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>

        {imageUrl && (
          <div className="w-full h-full flex justify-center">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full max-w-md md:max-w-full rounded-xl shadow-xl object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
