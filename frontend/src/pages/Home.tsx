import CTA from "../components/CTA";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import colors from "../styles/colors";
import { webDevPlans } from "../data/pricingData";
import Guarantees from "../components/Guarantees";
import Bonus from "../components/Bonus";

const Home = () => {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.darkText }}>
      {/* 1️⃣ Hook Visitors Immediately */}
      <Hero
        title="Build a Premium Website That Converts 🚀"
        subtitle="We design high-performance, conversion-focused websites that scale your business."
        primaryButtonText="Get Started"
        primaryButtonAction={() => console.log("Navigating to Get Started")}
        secondaryButtonText="Book a Free Consultation"
        secondaryButtonAction={() =>
          console.log("Opening consultation booking")
        }
      />

      <CTA
        title="🚀 Ready to Scale Your Business?"
        subtitle="Get a high-performance website that drives real results."
        primaryCTA="Get Started"
        showFormOption={true}
      />

      {/* 2️⃣ Show Proof & Build Trust */}
      <Features />
      <Services />
      <Process />
      <Guarantees />

      {/* 3️⃣ Highlight Special Bonuses */}
      <Bonus />

      {/* 4️⃣ Offer Pricing After Showing Value */}
      <Pricing title="Web Development Pricing" plans={webDevPlans} />

      {/* 5️⃣ Address Concerns & Close the Sale */}
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
