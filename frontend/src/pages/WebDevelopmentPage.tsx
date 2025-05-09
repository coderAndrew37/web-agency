import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import PortfolioShowcase from "../components/PortfolioShowcase";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import Process from "../components/Process";
import SEO from "../components/seo/Seo";
import ServiceContent from "../components/ServiceContent";
import WebsiteTypeCarousel from "../components/services/WebTypeCarousel";
import { calendlyUrl, frontendUrl } from "../config/constants";
import { webDevBonuses } from "../data/bonuses";
import { webDevFAQs } from "../data/faqs";
import { websitesFeatures } from "../data/features";
import { webDevFeatures, webDevPlans } from "../data/pricingData";
import { webDevProcess } from "../data/processes";
import { webProjects } from "../data/projects";

const WebDevelopmentPage = () => {
  return (
    <div>
      <SEO
        title="Web Development Services | SleekSites"
        description="Transform your online presence with our expert web development services. Get a custom website that drives results."
        image="/images/web-dev-hero.jpeg"
        url={`${frontendUrl}/services/web-development`}
      />
      {/* 1️⃣ Hero Section */}
      <Hero
        title="🌐 Let’s Build a Website That Works While You Sleep"
        subtitle="We craft powerful websites that attract traffic, convert visitors, and grow your business 24/7."
        primaryButtonText="Book Free Strategy Call"
        secondaryButtonText="Explore Portfolio"
        secondaryButtonAction={() => (window.location.href = "/portfolio")}
        calendlyUrl={calendlyUrl}
        imageUrl="/images/web-dev-hero.jpeg"
        imageAlt="Web Development Hero Image"
      />
      <ServiceContent
        title="Websites Built for Growth, Optimized for Results"
        tagline="We don’t just build websites. We create growth engines."
        whyNeed="In today’s competitive digital world, a great website isn’t optional — it’s essential. Whether you’re looking to generate leads, sell online, or boost brand credibility, your website is your most valuable digital asset."
        comparison="Unlike social media platforms that come and go, your website gives you complete ownership, control, and long-term value. Don’t leave your business at the mercy of algorithm changes."
        benefits={[
          "Capture more leads and convert more customers",
          "Rank higher on Google and get found fast",
          "Full control over your brand and user experience",
          "Built to grow as your business grows",
        ]}
        ctaText="Claim Your Free Web Strategy Call"
        ctaLink={calendlyUrl}
      />
      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Entrepreneurs Trust Us With Their Websites"
        features={websitesFeatures}
      />
      {/* 🔄 Carousel Section */}
      <WebsiteTypeCarousel />
      {/* 3️⃣ Web Development Process */}
      <Process
        title="Our Web Development Process"
        steps={webDevProcess.map((step) => ({
          ...step,
          icon: (
            <span role="img" aria-label={step.title}>
              {step.icon}
            </span>
          ),
        }))}
      />
      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Web Development Pricing" plans={webDevPlans} />
      {/* 5️⃣ Custom Pricing Calculator */}
      <PricingCalculator
        title="Customize Your Website Package"
        features={webDevFeatures}
        basePrice={20000} // Minimum price for web development
      />
      /* 6️⃣ Bonuses Section */
      <Bonus
        title="Web Development Bonuses"
        subtitle="We offer exclusive resources, one-on-one strategy sessions, and lifetime updates."
        items={webDevBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))}
      />
      <PortfolioShowcase projects={webProjects} />
      {/* 7️⃣ Frequently Asked Questions */}
      <FAQ title="Web Development FAQs" faqs={webDevFAQs} />
      {/* 8️⃣ Call-to-Action */}
      <CTA
        title="🚀 Ready to Build a Website That Works for You?"
        subtitle="Schedule a free strategy session and let’s create something powerful."
        primaryCTA="Get a Free Quote"
        calendlyUrl={calendlyUrl}
      />
      {/* 9️⃣ Newsletter Signup */}
      <Newsletter
        title="📢 Get the Latest Web Strategies for Your Business"
        subtitle="Join smart business owners getting expert tips to grow traffic, leads, and revenue online."
      />
    </div>
  );
};

export default WebDevelopmentPage;
