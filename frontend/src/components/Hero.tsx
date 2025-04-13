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
  calendlyUrl?: string; // optional calendly url
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
}: HeroProps) => {
  const { openCalendly } = useCalendly();

  const handlePrimaryClick = () => {
    if (primaryButtonAction) return primaryButtonAction();
    if (calendlyUrl) return openCalendly(calendlyUrl);
    console.warn(
      "No primaryButtonAction or calendlyUrl provided for Hero component."
    );
  };

  return (
    <section
      className="hero relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20 md:pt-32"
      style={{ backgroundColor, color: colors.darkText }}
    >
      <div className="relative z-10 max-w-4xl">
        <h1 className="hero-title text-5xl md:text-6xl font-extrabold leading-tight">
          {title}
        </h1>
        <p
          className="hero-subtext text-lg md:text-xl mt-4"
          style={{ color: colors.lightText }}
        >
          {subtitle}
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <button
            className="px-6 py-3 font-bold text-lg rounded-full shadow-md hover:opacity-80 transition"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handlePrimaryClick}
          >
            {primaryButtonText}
          </button>
          {secondaryButtonText && secondaryButtonAction && (
            <button
              className="px-6 py-3 border-2 font-bold text-lg rounded-full hover:opacity-80 transition"
              style={{
                borderColor: colors.primary,
                color: colors.darkText,
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={secondaryButtonAction}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
