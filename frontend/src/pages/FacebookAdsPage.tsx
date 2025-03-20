import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { facebookAdsPlans, facebookAdsFeatures } from "../data/pricingData";

const FacebookAdsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="📢 Maximize Your Reach with Facebook Ads"
        subtitle="Target the right audience and boost your sales with our proven ad strategies."
        primaryButtonText="Get a Free Ad Strategy"
        primaryButtonAction={() => console.log("Free Ad Strategy Clicked!")}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More Clicked!")}
      />

      {/* Why Choose Us */}
      <Features
        title="Why Choose Our Facebook Ads Services?"
        features={[
          {
            title: "Highly Targeted Campaigns",
            description: "Reach the right audience with precision.",
            icon: "🎯",
          },
          {
            title: "Data-Driven Optimization",
            description: "We analyze data to maximize ROI.",
            icon: "📊",
          },
          {
            title: "Creative Ad Copy & Design",
            description: "Engaging visuals and persuasive copy.",
            icon: "🎨",
          },
          {
            title: "Conversion Tracking & Analytics",
            description: "Track results and improve performance.",
            icon: "📈",
          },
        ]}
      />

      {/* Our Process */}
      <Process
        title="Our Facebook Ads Process"
        steps={[
          {
            title: "Ad Strategy Planning",
            description: "We analyze your goals and audience.",
            icon: "📌",
          },
          {
            title: "Creative Ad Design",
            description: "We craft compelling ads that convert.",
            icon: "🎨",
          },
          {
            title: "Campaign Launch & Management",
            description: "We set up and optimize ad performance.",
            icon: "🚀",
          },
          {
            title: "Analytics & Scaling",
            description: "We track, analyze, and scale successful ads.",
            icon: "📊",
          },
        ]}
      />

      {/* Pricing Plans */}
      <Pricing title="Facebook Ads Pricing" plans={facebookAdsPlans} />

      {/* 🔥 Add Pricing Calculator */}
      <PricingCalculator
        features={facebookAdsFeatures}
        title="Not found a suitable plan for you? Worry less, "
        basePrice={0}
      />

      {/* Call to Action */}
      <CTA
        title="📢 Get More Leads with Facebook Ads!"
        subtitle="Let’s create a powerful ad campaign for your business."
        primaryCTA="Start Advertising"
        onPrimaryClick={() => console.log("Start Advertising Clicked!")}
      />

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default FacebookAdsPage;
