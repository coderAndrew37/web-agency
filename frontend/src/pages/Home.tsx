import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="bg-dark text-light">
      {/* 1️⃣ Hook Visitors Immediately */}
      <Hero />
      <CTA />

      {/* 2️⃣ Show Proof & Build Trust */}

      {/* 3️⃣ Show How We Help */}
      <Features />
      <Services />
      <Process />

      {/* 4️⃣ Offer Pricing After Showing Value */}
      <Pricing />

      {/* 5️⃣ Address Concerns & Close the Sale */}
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
