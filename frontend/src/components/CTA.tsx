// components/CTA.tsx
import { useCalendly } from "../hooks/integrations/useCalendly";
import colors from "../styles/colors";

interface CTAProps {
  title: string;
  subtitle: string;
  primaryCTA: string;
  calendlyUrl?: string;
  onPrimaryClick?: () => void;
}

const CTA = ({
  title,
  subtitle,
  primaryCTA,
  calendlyUrl,
  onPrimaryClick,
}: CTAProps) => {
  const { openCalendly } = useCalendly();

  const handleClick = () => {
    if (onPrimaryClick) return onPrimaryClick();
    if (calendlyUrl) return openCalendly(calendlyUrl);
    console.warn("No onPrimaryClick or calendlyUrl provided for CTA.");
  };

  return (
    <section
      className="py-20 px-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f9f9f9] via-[#f0f0f0] to-[#e9e9e9]"
      style={{ color: colors.darkText }}
    >
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-2xl text-center">
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
    </section>
  );
};

export default CTA;
