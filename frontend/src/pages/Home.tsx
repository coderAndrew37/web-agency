import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div className="bg-dark text-light">
      <Hero />
      <Features />
      <Services />
      <CTA />
      <Pricing />
      <Process />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
