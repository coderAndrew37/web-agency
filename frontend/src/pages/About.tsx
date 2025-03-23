import Hero from "../components/Hero";
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
      <Hero
        title="Welcome to Our Agency"
        subtitle="We are here to help you succeed"
        primaryButtonText="Learn More"
        primaryButtonAction={() => console.log("Primary button clicked")}
      />
      <MissionVision />
      <Features />
      <MeetTheTeam />
      <Process />
      <CTA
        title="Join Us Today"
        subtitle="Be a part of our journey"
        primaryCTA="Get Started"
      />
      <Footer />
    </div>
  );
};

export default About;
