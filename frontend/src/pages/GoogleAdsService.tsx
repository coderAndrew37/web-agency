import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import ServiceContent from "../components/ServiceContent";
import { calendlyUrl, frontendUrl } from "../config/constants";
import { googleAdsBonuses } from "../data/bonuses";
import { googleAdsFAQs } from "../data/faqs";
import { googleAdsFeatures } from "../data/features";
import { googleAdsPlans } from "../data/pricingData";
import { googleAdsProcess } from "../data/processes";
import SEO from "../components/seo/Seo";

const GoogleAdsPage = () => {
  return (
    <div>
      <SEO
        title="Google Ads Services | SleekSites"
        description="Maximize your ROI with expertly managed Google Ads campaigns. Get a free Google Ads audit today!"
        image="/images/google-ads-hero.jpeg"
        url={`${frontendUrl}/services/google-ads`}
        keywords={[
          "Google Ads",
          "PPC Advertising",
          "Search Engine Marketing",
          "Online Advertising",
          "Lead Generation",
          "Conversion Optimization",
          "Digital Marketing",
        ]}
      />
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Maximize Your ROI with Google Ads 🚀"
        subtitle="Drive targeted traffic, increase conversions, and grow your business with expertly managed Google Ads campaigns."
        primaryButtonText="Get a Free Google Ads Audit"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About Google Ads")}
        imageUrl="/images/google-ads-hero.jpeg"
        imageAlt="Google Ads Management"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="High-Performance Google Ads Management"
        tagline="Dominate search results and drive targeted traffic with Google Ads."
        whyNeed="Google Ads offer instant visibility for businesses looking to attract high-intent customers. Without Google Ads, you're missing out on a massive audience actively searching for your services."
        comparison="Unlike organic SEO, Google Ads provide immediate traffic and measurable ROI, ensuring your business stays ahead of competitors."
        benefits={[
          "Instant search engine visibility",
          "Precise audience targeting for better conversion rates",
          "Data-driven optimization for maximum ROI",
          "Scalable campaigns to grow your business",
        ]}
        ctaText="Launch Your Google Ads Campaign Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Us for Google Ads?"
        features={googleAdsFeatures}
      />

      {/* 3️⃣ Our Process */}
      <Process
        title="Our Google Ads Management Process"
        steps={googleAdsProcess}
      />

      {/* 4️⃣ Bonus */}
      <Bonus
        title="🎁 Free Extras with Your Google Ads Campaign"
        subtitle="Every campaign includes valuable bonuses to help you generate more leads and maximize ROI."
        items={googleAdsBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))}
      />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Google Ads Management Pricing" plans={googleAdsPlans} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="Take Your Business to the Next Level with Google Ads!"
        subtitle="Let us manage your campaigns while you focus on running your business."
        primaryCTA="Start Your Google Ads Campaign"
        calendlyUrl={calendlyUrl}
        imagePath="/images/cta.jpeg"
      />

      {/* 5️⃣ FAQs */}
      <FAQ faqs={googleAdsFAQs} />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter
        title="📬 Win More Clients with Smarter Google Ads"
        subtitle="Join business owners getting expert ad tips, industry trends, and lead generation strategies monthly."
      />
    </div>
  );
};

export default GoogleAdsPage;
