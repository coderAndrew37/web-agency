import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Guarantees from "../components/Guarantees";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Process from "../components/Process";
import Services from "../components/Services";
import { calendlyUrl } from "../config/constants";
import colors from "../styles/colors";

// ⬇️ Import homepage data
import {
  defaultFeatures,
  defaultFAQs,
  defaultProcessSteps,
} from "../data/homepageData";

const Home = () => {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.darkText }}>
      <Hero
        title="We Build Growth Engines, Not Just Websites 🚀"
        subtitle="We help businesses scale through results-driven web development, digital marketing, and automation."
        primaryButtonText="Get a Custom Growth Plan"
        secondaryButtonText="Explore Our Work"
        secondaryButtonAction={() => console.log("Viewing Case Studies")}
        calendlyUrl={calendlyUrl}
      />

      <CTA
        title="🔥 Ready to Unlock Growth?"
        subtitle="Book a free strategy call and see how we can help."
        primaryCTA="Book My Call"
      />

      <Features features={defaultFeatures} />

      <Services />

      <Process steps={defaultProcessSteps} />

      <Guarantees />

      <Bonus />

      <FAQ faqs={defaultFAQs} />

      <Newsletter />
    </div>
  );
};

export default Home;
