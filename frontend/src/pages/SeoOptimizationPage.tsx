import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { seoPlans } from "../data/pricingData";

const seoFeatures = [
  {
    title: "Data-Driven SEO Strategies",
    description: "We analyze data to improve rankings.",
    icon: (
      <span role="img" aria-label="chart">
        📊
      </span>
    ),
  },
  {
    title: "Keyword Research & Optimization",
    description: "We target high-value keywords to drive traffic.",
    icon: (
      <span role="img" aria-label="key">
        🔑
      </span>
    ),
  },
  {
    title: "Technical SEO & Site Speed",
    description: "Optimize your site's performance & ranking.",
    icon: (
      <span role="img" aria-label="lightning">
        ⚡
      </span>
    ),
  },
  {
    title: "E-commerce Link Building",
    description: "Build authority & increase visibility.",
    icon: (
      <span role="img" aria-label="link">
        🔗
      </span>
    ),
  },
];

const seoProcess = [
  {
    title: "SEO Audit & Competitor Analysis",
    description: "Identify SEO gaps & competitor strengths.",
    icon: (
      <span role="img" aria-label="search">
        🔍
      </span>
    ),
  },
  {
    title: "Keyword Strategy & Content Plan",
    description: "Develop a keyword plan for targeted traffic.",
    icon: (
      <span role="img" aria-label="notebook">
        📝
      </span>
    ),
  },
  {
    title: "On-Page SEO Optimization",
    description: "Optimize metadata, structure & content.",
    icon: (
      <span role="img" aria-label="tools">
        🛠️
      </span>
    ),
  },
  {
    title: "Link Building & Authority Growth",
    description: "Earn backlinks & grow domain authority.",
    icon: (
      <span role="img" aria-label="link">
        🔗
      </span>
    ),
  },
  {
    title: "Ongoing Monitoring & Reporting",
    description: "Track rankings & improve performance.",
    icon: (
      <span role="img" aria-label="chart">
        📈
      </span>
    ),
  },
];

const SEOPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Boost Your Online Sales with SEO 🚀"
        subtitle="Rank higher on Google, attract more customers, and increase conversions with our proven SEO strategies."
        primaryButtonText="Get a Free SEO Audit"
        primaryButtonAction={() => console.log("SEO Audit Requested")}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About SEO")}
      />

      {/* 2️⃣ Why Choose Us */}
      <Features title="Why Choose Our SEO Services?" features={seoFeatures} />

      {/* 3️⃣ SEO Process */}
      <Process title="Our SEO Optimization Process" steps={seoProcess} />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="E-commerce SEO Pricing" plans={seoPlans} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="Get Found on Google & Grow Your Sales!"
        subtitle="Let's improve your search rankings and boost your online visibility."
        primaryCTA="Request SEO Optimization"
        onPrimaryClick={() => console.log("SEO Optimization Requested")}
      />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default SEOPage;
