import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import Features from "../components/Features";
import Process from "../components/Process";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import Hero from "../components/Hero";
import webDevPlans from "../data/webDevPlans";

const webDevFeatures = [
  { name: "E-Commerce Functionality", price: 20000 },
  { name: "SEO Optimization", price: 5000 },
  { name: "Speed Optimization", price: 3000 },
  { name: "Security Enhancements", price: 4000 },
  { name: "Custom Animations", price: 6000 },
  { name: "CMS Integration", price: 10000 },
  { name: "Blog Setup", price: 7000 },
  { name: "Live Chat & Support", price: 8000 },
  { name: "Analytics & Tracking", price: 5000 },
  { name: "Custom Forms & Automation", price: 6000 },
  { name: "Membership System", price: 15000 },
  { name: "API Integrations", price: 12000 },
];

const WebDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero />

      {/* 2️⃣ Why Choose Us (Key Features) */}
      <Features />

      {/* 3️⃣ Web Development Process */}
      <Process />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Web Development Pricing" plans={webDevPlans} />
      <PricingCalculator features={webDevFeatures} basePrice={0} />

      {/* 6️⃣ Call to Action */}
      <CTA />

      {/* 7️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default WebDevelopmentPage;
