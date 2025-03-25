import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import LeadMagnet from "../components/LeadMagnet";
import Newsletter from "../components/Newsletter";
import { facebookAdsPlans, facebookAdsFeatures } from "../data/pricingData";
import FAQ from "../components/FAQ";

const facebookAdsFAQs = [
  {
    question: "How long does it take to see results with Facebook Ads?",
    answer:
      "You can start seeing results within a few days, but optimization may take 2-4 weeks for best performance.",
  },
  {
    question: "What budget do I need for Facebook Ads?",
    answer:
      "We recommend a minimum budget of Ksh 20000/month to see meaningful results, but we tailor campaigns to your needs.",
  },
  {
    question: "Do you handle ad creatives and copy?",
    answer:
      "Yes! We provide professionally designed ads and persuasive copy to maximize engagement and conversions.",
  },
  {
    question: "Can I track the performance of my ads?",
    answer:
      "Absolutely! We provide detailed reports on performance, conversions, and return on investment (ROI).",
  },
];
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
            icon: (
              <span role="img" aria-label="target">
                🎯
              </span>
            ),
          },
          {
            title: "Data-Driven Optimization",
            description: "We analyze data to maximize ROI.",
            icon: (
              <span role="img" aria-label="chart">
                📊
              </span>
            ),
          },
          {
            title: "Creative Ad Copy & Design",
            description: "Engaging visuals and persuasive copy.",
            icon: (
              <span role="img" aria-label="art">
                🎨
              </span>
            ),
          },
          {
            title: "Conversion Tracking & Analytics",
            description: "Track results and improve performance.",
            icon: (
              <span role="img" aria-label="chart">
                📈
              </span>
            ),
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
            icon: (
              <span role="img" aria-label="pin">
                📌
              </span>
            ),
          },
          {
            title: "Creative Ad Design",
            description: "We craft compelling ads that convert.",
            icon: (
              <span role="img" aria-label="art">
                🎨
              </span>
            ),
          },
          {
            title: "Campaign Launch & Management",
            description: "We set up and optimize ad performance.",
            icon: (
              <span role="img" aria-label="rocket">
                🚀
              </span>
            ),
          },
          {
            title: "Analytics & Scaling",
            description: "We track, analyze, and scale successful ads.",
            icon: (
              <span role="img" aria-label="chart">
                📊
              </span>
            ),
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

      {/* Lead Magnet */}
      <LeadMagnet
        title="🎯 Facebook Ads Mastery Guide"
        description="Learn how to run profitable Facebook Ads."
        resourceType="Facebook Ads Mastery"
      />

      {/* Frequently Asked Questions */}
      <FAQ title="Facebook Ads FAQs" faqs={facebookAdsFAQs} />

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default FacebookAdsPage;
