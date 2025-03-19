import { useState } from "react";
import ClientOnboarding from "./ClientOnboarding";
import colors from "../styles/colors";

interface CTAProps {
  title: string;
  subtitle: string;
  primaryCTA: string;
  onPrimaryClick?: () => void;
  showFormOption?: boolean;
}

const CTA = ({
  title,
  subtitle,
  primaryCTA,
  onPrimaryClick,
  showFormOption = false,
}: CTAProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    if (showFormOption) {
      setShowForm((prev) => !prev);
    }
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  return (
    <section
      className="py-20 text-center"
      style={{ backgroundColor: colors.primary, color: colors.darkText }}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-lg">{subtitle}</p>

      <button
        className="mt-6 px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
        style={{
          backgroundColor: colors.darkText,
          color: colors.background,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {showForm ? "Close Form" : primaryCTA}
      </button>

      {showFormOption && showForm && (
        <div className="mt-8">
          <ClientOnboarding />
        </div>
      )}
    </section>
  );
};

export default CTA;
