import HeroSection from "../components/AboutHero";
import MissionVision from "../components/Mission";
import Features from "../components/Features";
import MeetTheTeam from "../components/Team";
//import Testimonials from "../components/Testimonials";
import Process from "../components/Process";
import CTA from "../components/CTA";
//import AnimatedCounters from "../components/AnimatedCounters";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <HeroSection />
      <MissionVision />
      <Features />
      <MeetTheTeam />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
};

export default About;
