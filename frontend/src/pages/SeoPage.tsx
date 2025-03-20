import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { seoPlans } from "../data/pricingData";

const seoFeatures = [
  {
    title: "Keyword Optimization",
    description: "Target high-converting keywords to boost your rankings.",
    icon: "🔍",
  },
  {
    title: "Technical SEO Fixes",
    description: "Fix site speed, mobile usability, and technical errors.",
    icon: "⚙️",
  },
  {
    title: "Content Marketing Strategy",
    description: "Build authority with high-quality, SEO-friendly content.",
    icon: "✍️",
  },
  {
    title: "Authority Link Building",
    description: "Earn backlinks from high-authority domains.",
    icon: "🔗",
  },
];

const seoProcess = [
  {
    title: "SEO Audit & Research",
    description: "Analyze your current rankings & find growth opportunities.",
    icon: "📊",
  },
  {
    title: "On-Page Optimization",
    description: "Optimize titles, meta tags, and content for better rankings.",
    icon: "📄",
  },
  {
    title: "Technical Fixes & Speed Optimization",
    description: "Improve page speed, mobile usability, and indexing.",
    icon: "⚡",
  },
  {
    title: "Content & Link Building Strategy",
    description: "Develop a strategic plan for content and backlinks.",
    icon: "📢",
  },
  {
    title: "Tracking & Analytics",
    description: "Monitor keyword rankings, traffic, and conversions.",
    icon: "📊",
  },
];

const SeoPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Boost Your Rankings with Expert SEO 🚀"
        subtitle="Get more traffic, more leads, and more sales with our proven SEO strategies."
        primaryButtonText="Get a Free SEO Audit"
        primaryButtonAction={() => console.log("SEO Audit Requested")}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About SEO")}
      />

      {/* 2️⃣ Why Choose Us */}
      <Features title="Why Choose Our SEO Services?" features={seoFeatures} />

      {/* 3️⃣ SEO Process */}
      <Process title="Our SEO Strategy" steps={seoProcess} />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="SEO Pricing Plans" plans={seoPlans} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="📈 Ready to Dominate Google?"
        subtitle="Let's Optimize Your Site for Maximum Growth"
        primaryCTA="Request SEO Consultation"
        onPrimaryClick={() => console.log("SEO Consultation Requested")}
      />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default SeoPage;
