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
import ServiceContent from "../components/ServiceContent";
import WebsiteTypeCarousel from "../components/services/WebTypeCarousel";
import { calendlyUrl } from "../config/constants";
import { webDevBonuses } from "../data/bonuses";
import { webDevFAQs } from "../data/faqs";
import { webDevFeatures, webDevPlans } from "../data/pricingData";
import { webDevProcess } from "../data/processes";

const WebDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}

      <Hero
        title="🌐 Let’s Build a Website That Works While You Sleep"
        subtitle="We craft powerful websites that attract traffic, convert visitors, and grow your business 24/7."
        primaryButtonText="Book Free Strategy Call"
        secondaryButtonText="Explore Portfolio"
        secondaryButtonAction={() => console.log("Portfolio Clicked!")}
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
        features={[
          {
            title: "Built-In SEO",
            description:
              "We don’t charge extra for SEO—it’s part of every site we launch.",
            icon: (
              <span role="img" aria-label="search">
                🔍
              </span>
            ),
          },
          {
            title: "Online Store Ready",
            description:
              "From product pages to payments—we set up everything you need to sell online.",
            icon: (
              <span role="img" aria-label="shopping cart">
                🛒
              </span>
            ),
          },
          {
            title: "Mobile First",
            description:
              "Designed for smartphones first—because that’s where most traffic comes from.",
            icon: (
              <span role="img" aria-label="mobile phone">
                📱
              </span>
            ),
          },
          {
            title: "Speed + Security",
            description:
              "We optimize for lightning-fast load times and secure data handling.",
            icon: (
              <span role="img" aria-label="lightning bolt">
                ⚡
              </span>
            ),
          },
        ]}
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

      {/* 6️⃣ Bonuses Section */}
      <Bonus bonuses={webDevBonuses} />

      {/* 7️⃣ Portfolio Showcase */}
      <PortfolioShowcase />

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
        title="Stay Updated with Our Newsletter"
        subtitle="Subscribe to receive the latest updates and insights directly in your inbox."
      />
    </div>
  );
};

export default WebDevelopmentPage;
