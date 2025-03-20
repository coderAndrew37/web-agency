import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { googleAdsPlans } from "../data/pricingData";

const googleAdsFeatures = [
  {
    title: "Expert Campaign Management",
    description: "We create and manage high-performance Google Ads campaigns.",
    icon: (
      <span role="img" aria-label="target">
        🎯
      </span>
    ),
  },
  {
    title: "Keyword Research & Optimization",
    description: "Target the right audience with precise keyword strategies.",
    icon: (
      <span role="img" aria-label="magnifying glass">
        🔎
      </span>
    ),
  },
  {
    title: "High-Converting Ad Copy",
    description: "Engaging, persuasive copy to maximize conversions.",
    icon: (
      <span role="img" aria-label="writing hand">
        ✍️
      </span>
    ),
  },
  {
    title: "Budget Optimization & Scaling",
    description: "Ensure maximum ROI with strategic budget allocation.",
    icon: (
      <span role="img" aria-label="money bag">
        💰
      </span>
    ),
  },
];

const googleAdsProcess = [
  {
    title: "Understanding Your Business Goals",
    description: "We analyze your objectives to craft a custom strategy.",
    icon: (
      <span role="img" aria-label="trophy">
        🏆
      </span>
    ),
  },
  {
    title: "Keyword Research & Competitor Analysis",
    description: "Find the best keywords and analyze competitors.",
    icon: (
      <span role="img" aria-label="bar chart">
        📊
      </span>
    ),
  },
  {
    title: "Ad Creation & Landing Page Optimization",
    description:
      "Design ads and optimize landing pages for better performance.",
    icon: (
      <span role="img" aria-label="artist palette">
        🎨
      </span>
    ),
  },
  {
    title: "Campaign Monitoring & Optimization",
    description: "We continuously track and tweak campaigns for success.",
    icon: (
      <span role="img" aria-label="gear">
        ⚙️
      </span>
    ),
  },
  {
    title: "Performance Reporting & Scaling",
    description: "Receive detailed reports and scale up winning campaigns.",
    icon: (
      <span role="img" aria-label="chart increasing">
        📈
      </span>
    ),
  },
];

const GoogleAdsPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Maximize Your ROI with Google Ads 🚀"
        subtitle="Drive targeted traffic, increase conversions, and grow your business with expertly managed Google Ads campaigns."
        primaryButtonText="Get a Free Google Ads Audit"
        primaryButtonAction={() => console.log("Google Ads Audit Requested")}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About Google Ads")}
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Us for Google Ads?"
        features={googleAdsFeatures}
      />

      {/* 3️⃣ Our Process */}
      <Process
        title="Our Google Ads Management Process"
        steps={googleAdsProcess}
      />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Google Ads Management Pricing" plans={googleAdsPlans} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="Take Your Business to the Next Level with Google Ads!"
        subtitle="Let us manage your campaigns while you focus on running your business."
        primaryCTA="Start Your Google Ads Campaign"
        onPrimaryClick={() => console.log("Google Ads Started!")}
      />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default GoogleAdsPage;
