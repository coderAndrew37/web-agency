import { useState } from "react";
import ClientOnboarding from "./ClientOnboarding";
import colors from "../styles/colors";

const CTA = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      className="py-20 text-center"
      style={{ backgroundColor: colors.primary, color: colors.darkText }}
    >
      <h2 className="text-4xl font-bold">🚀 Ready to Scale Your Business?</h2>
      <p className="mt-4 text-lg">
        Get a professional website that drives real results.
      </p>

      <button
        className="mt-6 px-6 py-3 font-bold rounded-full shadow-md hover:opacity-80 transition"
        style={{
          backgroundColor: colors.darkText,
          color: colors.background,
          cursor: "pointer",
        }}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Close Form" : "Get Started"}
      </button>

      {showForm && (
        <div className="mt-8">
          <ClientOnboarding />
        </div>
      )}
    </section>
  );
};

export default CTA;
