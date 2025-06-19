import React from "react";
import { CheckCircleIcon } from "lucide-react";
import PageHero from "../components/PageHero";
import Features from "../components/Features";
import CallToAction from "../components/CTA";
import CustomPricing from "../components/CustomPricing";

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
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
        description="No hidden fees. Everything you need to build your fitness coaching business online."
      />

      <Pricing />

      <Features
        features={pricingFeatures}
        title="What's Included in Every Plan"
        bgColor="bg-white"
      />

      <CustomPricing />

      <CallToAction
        title="Ready to Get Started?"
        description="Choose the plan that's right for your coaching business"
        primaryButton={{ text: "View Plans", link: "#pricing" }}
      />
    </div>
  );
};

export default Pricing;
