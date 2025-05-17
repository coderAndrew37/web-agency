import { useParams } from "react-router-dom";
import CardGrid from "../components/CardGrid";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import { websiteTypes } from "../data/websitesData";
import colors from "../styles/colors";
import { calendlyUrl } from "../config/constants";
import { testimonials } from "../data/testimonials";

export default function WebsiteTypeDetail() {
  const { slug } = useParams();
  const website = websiteTypes.find((website) => website.slug === slug);

  if (!website) {
    return <div className="text-center py-20">Website type not found.</div>;
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-20 mt-12 md:mt-0"
        style={{ backgroundColor: colors.background, color: colors.darkText }}
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {website.title}
          </h1>
          <p className="text-lg text-gray-700">{website.heroText}</p>
          <button
            className="px-6 py-3 font-bold text-lg rounded-full shadow-md hover:opacity-80 transition"
            style={{ backgroundColor: colors.primary, color: "#fff" }}
            onClick={() => window.open(calendlyUrl, "_blank")}
          >
            Get Started Now
          </button>
        </div>
        <img
          src={website.image}
          alt={website.title}
          className="rounded-xl shadow-lg w-full object-cover max-h-[400px]"
        />
      </section>

      {/* Description Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Why This Website Type Matters
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {website.shortDescription}
        </p>
      </section>

      {/* Feature Highlights */}
      <CardGrid
        title="What You Get"
        items={website.features.map((feature) => ({
          ...feature,
          icon: <span className="text-3xl">{feature.icon}</span>,
        }))}
      />

      {/* Social Proof Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-10">What Our Clients Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.slice(0, 4).map((t) => (
              <blockquote
                key={t.name}
                className="bg-white shadow p-6 rounded-lg"
              >
                <p className="text-lg italic">“{t.text}”</p>
                <p className="mt-4 font-medium text-primary">
                  — {t.name}, {t.role}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <CardGrid
        title="Who This Is For"
        items={website.useCases.map((u) => ({
          title: u,
          description: "Ideal for growing businesses looking to scale online.",
          icon: <span className="text-3xl">💼</span>,
        }))}
      />

      {/* CTA */}
      <CTA
        title="Ready to Elevate Your Online Presence?"
        subtitle={`We build high-performing ${website.title}s tailored to your business.`}
        primaryCTA="Start Your Project"
        showFormOption={true}
      />

      {/* Process Overview */}
      <CardGrid
        title="How We Build It"
        items={website.process.map((step) => ({
          title: step.title,
          description: step.description,
          icon: <span className="text-3xl">{step.icon || "⚙️"}</span>,
        }))}
      />

      {/* FAQs */}
      <FAQ faqs={website.faqs} />

      {/* Sticky CTA */}
      <div
        className="fixed bottom-4 right-4 bg-primary text-white px-5 py-3 rounded-full shadow-lg z-50 hover:opacity-90 cursor-pointer"
        onClick={() => window.open(calendlyUrl, "_blank")}
      >
        Book a Free Strategy Call →
      </div>
    </main>
  );
}
