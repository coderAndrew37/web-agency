import CTA from "../components/CTA";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import colors from "../styles/colors";
import webDevPlans from "../data/webDevPlans";

const Home = () => {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.darkText }}>
      {/* 1️⃣ Hook Visitors Immediately */}
      <Hero />
      <CTA />

      {/* 2️⃣ Show Proof & Build Trust */}
      <Features />
      <Services />
      <Process />

      {/* 4️⃣ Offer Pricing After Showing Value */}
      <Pricing title="Web Development Pricing" plans={webDevPlans} />

      {/* 5️⃣ Address Concerns & Close the Sale */}
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
