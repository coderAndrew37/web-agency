import { useState } from "react";
import ClientOnboarding from "./ClientOnboarding";

const CTA = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-20 text-center bg-primary text-dark">
      <h2 className="text-4xl font-bold">🚀 Ready to Scale Your Business?</h2>
      <p className="mt-4 text-lg">
        Get a professional website that drives real results.
      </p>

      <button
        className="btn-dark mt-6"
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
