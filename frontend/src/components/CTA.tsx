import { useCalendly } from "../hooks/integrations/useCalendly";
import colors from "../styles/colors";

interface CTAProps {
  title: string;
  subtitle: string;
  primaryCTA: string;
  calendlyUrl?: string;
  onPrimaryClick?: () => void;
  imagePath?: string; // path relative to public/
  showFormOption?: boolean;
}

const CTA = ({
  title,
  subtitle,
  primaryCTA,
  calendlyUrl,
  onPrimaryClick,
  imagePath = "/images/cta.jpeg", // default image path
}: CTAProps) => {
  const { openCalendly } = useCalendly();

  const handleClick = () => {
    if (onPrimaryClick) return onPrimaryClick();
    if (calendlyUrl) return openCalendly(calendlyUrl);
    console.warn("No onPrimaryClick or calendlyUrl provided for CTA.");
  };

  return (
    <section className="py-20 px-6" style={{ color: colors.darkText }}>
      <div className="max-w-6xl mx-auto  flex flex-col lg:flex-row items-center">
        {/* Text Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>

          <button
            className="mt-8 px-6 py-3 text-white text-lg font-semibold rounded-full bg-black hover:bg-gray-900 transition-colors duration-300"
            onClick={handleClick}
          >
            {primaryCTA}
          </button>
        </div>

        {/* Image Column */}
        {imagePath && (
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-10 flex justify-center">
            <img src={imagePath} alt="CTA" className="max-w-full h-auto " />
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
