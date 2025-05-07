import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { seoPlans } from "../data/pricingData";
import { Search, FileText } from "lucide-react";
import Bonus from "../components/Bonus";
import FAQ from "../components/FAQ";
import ServiceContent from "../components/ServiceContent";
import { calendlyUrl } from "../config/constants";

const seoFeatures = [
  {
    title: "Keyword Optimization",
    description: "Target high-converting keywords to boost your rankings.",
    icon: (
      <span role="img" aria-label="magnifying glass">
        🔍
      </span>
    ),
  },
  {
    title: "Technical SEO Fixes",
    description: "Fix site speed, mobile usability, and technical errors.",
    icon: (
      <span role="img" aria-label="gear">
        ⚙️
      </span>
    ),
  },
  {
    title: "Content Marketing Strategy",
    description: "Build authority with high-quality, SEO-friendly content.",
    icon: (
      <span role="img" aria-label="writing hand">
        ✍️
      </span>
    ),
  },
  {
    title: "Authority Link Building",
    description: "Earn backlinks from high-authority domains.",
    icon: (
      <span role="img" aria-label="link">
        🔗
      </span>
    ),
  },
];

const seoProcess = [
  {
    title: "SEO Audit & Research",
    description: "Analyze your current rankings & find growth opportunities.",
    icon: (
      <span role="img" aria-label="bar chart">
        📊
      </span>
    ),
  },
  {
    title: "On-Page Optimization",
    description: "Optimize titles, meta tags, and content for better rankings.",
    icon: (
      <span role="img" aria-label="document">
        📄
      </span>
    ),
  },
  {
    title: "Technical Fixes & Speed Optimization",
    description: "Improve page speed, mobile usability, and indexing.",
    icon: (
      <span role="img" aria-label="high voltage">
        ⚡
      </span>
    ),
  },
  {
    title: "Content & Link Building Strategy",
    description: "Develop a strategic plan for content and backlinks.",
    icon: (
      <span role="img" aria-label="megaphone">
        📢
      </span>
    ),
  },
  {
    title: "Tracking & Analytics",
    description: "Monitor keyword rankings, traffic, and conversions.",
    icon: (
      <span role="img" aria-label="bar chart">
        📊
      </span>
    ),
  },
];

const seoFAQs = [
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO is a long-term strategy, and you can start seeing results within 3-6 months, depending on competition and website authority.",
  },
  {
    question: "Do you guarantee #1 rankings on Google?",
    answer:
      "No ethical SEO agency can guarantee #1 rankings, but we use proven strategies to improve rankings and increase traffic.",
  },
  {
    question: "Will I need to keep doing SEO?",
    answer:
      "Yes! SEO requires ongoing effort to maintain rankings and keep up with search engine updates.",
  },
  {
    question: "How much does SEO cost in Kenya?",
    answer:
      "Our SEO services start at KES 15,000 per month, depending on the scope of work.",
  },
];

const seoBonuses = [
  {
    title: "Free SEO Audit",
    description: "Get a detailed analysis of your website’s SEO performance.",
    icon: Search,
  },
  {
    title: "Content Optimization Guide",
    description:
      "Receive a step-by-step guide to optimize your website’s content.",
    icon: FileText,
  },
  {
    title: "Backlink Strategy Report",
    description:
      "A customized plan to earn high-quality backlinks for your website.",
    icon: Search, // Replace 'Link' with a valid SVG icon like 'Search'
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
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About SEO")}
        imageUrl="/images/seo-hero.jpeg" // ✅ SEO page image
        imageAlt="SEO Hero Image"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="SEO That Drives Real Business Growth"
        tagline="Increase visibility, rank higher, and dominate search results."
        whyNeed="SEO is essential for any business looking to increase online visibility and attract organic traffic. Without proper SEO, your website won’t reach its full potential."
        comparison="Unlike paid ads, SEO provides long-term organic traffic without ongoing ad spend, making it a cost-effective marketing strategy."
        benefits={[
          "Higher Google rankings and increased traffic",
          "Long-term, sustainable results",
          "Improved website performance and user experience",
          "More qualified leads and conversions",
        ]}
        ctaText="Start Ranking Higher Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features title="Why Choose Our SEO Services?" features={seoFeatures} />

      {/* 3️⃣ SEO Process */}
      <Process title="Our SEO Strategy" steps={seoProcess} />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="SEO Pricing Plans" plans={seoPlans} />

      <Bonus bonuses={seoBonuses} />

      <FAQ title="SEO FAQs" faqs={seoFAQs} />

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
