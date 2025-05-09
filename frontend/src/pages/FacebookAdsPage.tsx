import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import LeadMagnet from "../components/LeadMagnet";
import Newsletter from "../components/Newsletter";
import { facebookAdsPlans, facebookAdsFeatures } from "../data/pricingData";
import FAQ from "../components/FAQ";
import { calendlyUrl } from "../config/constants";
import { facebookAdsFAQs } from "../data/faqs";
import { facebookAdsProcess } from "../data/processes";
import { facebookAdsBonuses } from "../data/bonuses";
import { facebookAdsFeatures as features } from "../data/features";
import Bonus from "../components/Bonus";

const FacebookAdsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="📢 Maximize Your Reach with Facebook Ads"
        subtitle="Target the right audience and boost your sales with our proven ad strategies."
        primaryButtonText="Get a Free Ad Strategy"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More Clicked!")}
        imageUrl="/images/facebook-hero.jpeg"
        imageAlt="Facebook Ads Hero Image"
      />

      {/* Why Choose Us */}
      <Features
        title="Why Choose Our Facebook Ads Services?"
        features={features}
      />

      {/* Our Process */}
      <Process title="Our Facebook Ads Process" steps={facebookAdsProcess} />

      {/* Pricing Plans */}
      <Pricing title="Facebook Ads Pricing" plans={facebookAdsPlans} />

      {/* 🔥 Add Pricing Calculator */}
      <PricingCalculator
        features={facebookAdsFeatures}
        title="Not found a suitable plan for you? Worry less, "
        basePrice={0}
      />

      {/* Call to Action */}
      <CTA
        title="📢 Get More Leads with Facebook Ads!"
        subtitle="Let’s create a powerful ad campaign for your business."
        primaryCTA="Start Advertising"
        calendlyUrl={calendlyUrl}
        imagePath="/images/cta.jpeg"
      />

      {/* Lead Magnet */}
      <LeadMagnet
        title="🎯 Facebook Ads Mastery Guide"
        description="Learn how to run profitable Facebook Ads."
        resourceType="Facebook Ads Mastery"
      />

      <Bonus
        title="🎁 Exclusive Bonuses for Facebook Ads Clients"
        subtitle="Get extra tools and resources to help you convert more leads and scale your campaigns."
        items={facebookAdsBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))}
      />

      {/* Frequently Asked Questions */}
      <FAQ title="Facebook Ads FAQs" faqs={facebookAdsFAQs} />

      {/* Newsletter Signup */}
      <Newsletter
        title="📬 Get Facebook Ads Tips That Drive Results"
        subtitle="Join business owners getting proven ad strategies and marketing insights every month."
      />
    </div>
  );
};

export default FacebookAdsPage;
