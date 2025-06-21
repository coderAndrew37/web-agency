import React from "react";
import { CheckCircleIcon } from "lucide-react";
import PageHero from "../components/PageHero";
import Features from "../components/Features";
import CallToAction from "../components/CTA";
import CustomPricing from "../components/CustomPricing";
import PricingSection from "../components/PricingSection";
import Pricinghero from "../assets/pricing-hero.jpeg";
import WebsiteInAWeek from "../components/WebsiteInAWeek";
import ThisSoundFamiliar from "../components/ThisSoundsFamiliar";

const Pricing: React.FC = () => {
  const pricingFeatures = [
    {
      name: "No Hidden Fees",
      description: "Transparent pricing with no surprises",
      icon: CheckCircleIcon,
    },
    {
      name: "Free Updates",
      description: "Regular updates at no additional cost",
      icon: CheckCircleIcon,
    },
    {
      name: "Mobile Optimized",
      description: "All websites work perfectly on any device",
      icon: CheckCircleIcon,
    },
    {
      name: "Money-Back Guarantee",
      description: "30-day satisfaction guarantee",
      icon: CheckCircleIcon,
    },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="Simple, Transparent Pricing"
        subtitle="Pricing"
        primaryButton={{ text: "Get Started", link: "/contact" }}
        description="No hidden fees. Everything you need to build your fitness coaching business online."
        image={Pricinghero}
      />

      <PricingSection />

      <Features
        features={pricingFeatures}
        title="What's Included in Every Plan"
        bgColor="bg-white"
      />

      <CustomPricing />
      <CallToAction
        title="Ready to Get Started?"
        description="You've made it this far. We'd love to chat about which plan is best for you. Contact us to get started."
        primaryButton={{ text: "Get Started", link: "/contact" }}
      />

      <section>
        <p className="text-center my-12">
          Not ready for our custom packages just yet? We understand. Check out
          our Website in a Week program. It's an affordable way to get a website
          up and running quickly.
        </p>
      </section>

      <WebsiteInAWeek />

      <ThisSoundFamiliar />
    </div>
  );
};

export default Pricing;
