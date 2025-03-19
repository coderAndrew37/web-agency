import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import colors from "../styles/colors";
import PricingCalculator from "../components/PricingCalculator";
import Hero from "../components/Hero";

const WebDevelopmentPage = () => {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.darkText }}>
      {/* 1️⃣ Hero Section */}
      <Hero />

      {/* 2️⃣ Why Choose Us (Key Features) */}
      <Features />

      {/* 3️⃣ Web Development Process */}
      <Process />

      {/* 4️⃣ Pricing Plans */}
      <Pricing />

      <PricingCalculator />

      {/* 6️⃣ Call to Action */}
      <CTA />

      {/* 7️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default WebDevelopmentPage;
