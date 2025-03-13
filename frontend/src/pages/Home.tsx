import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-dark text-light">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
