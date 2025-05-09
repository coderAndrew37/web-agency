import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Guarantees from "../components/Guarantees";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Process from "../components/Process";
import ServicesCarousel from "../components/serviceCarousel";
import { calendlyUrl } from "../config/constants";
import colors from "../styles/colors";

import BlogCarousel from "../components/BlogCarousel";
import {
  defaultFAQs,
  defaultFeatures,
  defaultProcessSteps,
} from "../data/homepageData";

const Home = () => {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.darkText }}>
      <Hero
        title="We Build Growth Engines, Not Just Websites 🚀"
        subtitle="Full-funnel execution from strategy to scale. Websites, automation, traffic—done for you."
        primaryButtonText="Get Your Growth Blueprint"
        secondaryButtonText="See Case Studies"
        secondaryButtonAction={() => (window.location.href = "/portfolio")}
        calendlyUrl={calendlyUrl}
        imageUrl="/images/hero.jpeg" // ✅ homepage image
        imageAlt="Growth Engine Visual"
      />

      <Features
        title="Why Clients Choose Us"
        subtitle="We’re not a web agency. We’re your growth partner—from first click to final close."
        features={defaultFeatures}
      />

      <ServicesCarousel />

      <Process
        title="Our 4-Step Growth Framework"
        subtitle="Every win starts with a plan. Here’s how we deliver consistent results."
        steps={defaultProcessSteps}
      />

      <CTA
        title="🔥 Ready to 3x Your Pipeline?"
        subtitle="Let’s build a custom game plan to attract, convert, and scale. No fluff. Just ROI."
        primaryCTA="Book My Strategy Call"
        calendlyUrl={calendlyUrl}
        imagePath="/images/cta.jpeg"
      />

      <Guarantees
        title="Your Growth, Guaranteed"
        subtitle="If you don’t see traction, you don’t pay. We put our money where our mouth is."
      />

      <Bonus
        title="Hiring a Team? Don’t."
        subtitle="For less than the cost of 1 hire, get a full-stack growth squad on your side."
      />

      <FAQ
        title="Got Questions?"
        subtitle="We’ve got straight answers. Here’s what people ask us the most."
        faqs={defaultFAQs}
      />

      <CTA
        title="🚀 Let’s Build Your Growth Engine"
        subtitle="Book a free strategy call to see how we can help you scale."
        primaryCTA="Book My Strategy Call"
        calendlyUrl={calendlyUrl}
        imagePath="/images/contact_info.png"
      />

      <BlogCarousel />

      <Newsletter
        title="📩 Steal Our Strategies"
        subtitle="Join 2,500+ growth-minded founders getting proven tactics weekly."
      />
    </div>
  );
};

export default Home;
