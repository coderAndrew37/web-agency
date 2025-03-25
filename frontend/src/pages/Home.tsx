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
        title="We Don’t Just Build Websites—We Build Sales Machines 🚀"
        subtitle="From high-performance websites to conversion-driven marketing, we help businesses generate leads, increase sales, and scale effortlessly."
        primaryButtonText="Get a Custom Growth Strategy"
        primaryButtonAction={() => console.log("Navigating to Growth Strategy")}
        secondaryButtonText="See How We Scale Businesses"
        secondaryButtonAction={() => console.log("Viewing Success Stories")}
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
