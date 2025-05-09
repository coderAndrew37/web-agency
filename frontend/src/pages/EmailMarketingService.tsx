import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQs from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import ServiceContent from "../components/ServiceContent";
import { calendlyUrl } from "../config/constants";
import { emailMarketingBonuses } from "../data/bonuses";
import { emailMarketingFAQs } from "../data/faqs";
import { emailMarketingFeatures } from "../data/features";
import { emailMarketingPlans } from "../data/pricingData";
import { emailMarketingProcess } from "../data/processes";

const EmailMarketingPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Supercharge Your Sales with Email Marketing 📩"
        subtitle="Engage, nurture, and convert leads into customers with high-converting email campaigns."
        primaryButtonText="Get a Free Email Marketing Strategy"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() =>
          console.log("Learn More About Email Marketing")
        }
        imageUrl="/images/email-marketing-hero.jpeg" // ✅ Email Marketing page image
        imageAlt="Email Marketing Hero Image"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="Maximize Conversions with Email Marketing"
        tagline="Email marketing delivers the highest ROI of any marketing channel."
        whyNeed="Email marketing is essential for customer retention, repeat sales, and automated lead nurturing. Without it, you’re leaving money on the table."
        comparison="Unlike social media, email marketing provides direct, personal communication with potential customers, resulting in higher engagement and conversion rates."
        benefits={[
          "Cost-effective and scalable campaigns",
          "Direct engagement with your audience",
          "Automated sequences for lead nurturing",
          "Detailed tracking and optimization for better ROI",
        ]}
        ctaText="Start Your Email Campaign Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Us for Email Marketing?"
        features={emailMarketingFeatures}
      />

      {/* 3️⃣ Our Process */}
      <Process
        title="Our Email Marketing Process"
        steps={emailMarketingProcess}
      />

      {/* 4️⃣ Bonus */}
      <Bonus
        title="🎁 Email Marketing Bonuses Included"
        subtitle="We include extra resources to help you convert more leads and boost ROI with every campaign."
        items={emailMarketingBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))} // Ensure icons are rendered correctly
      />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Email Marketing Pricing" plans={emailMarketingPlans} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="Get More Sales with Strategic Email Campaigns"
        subtitle="We create, optimize, and manage email campaigns that deliver results."
        primaryCTA="Start Your Email Campaign"
        onPrimaryClick={() => console.log("Email Campaign Started!")}
      />

      {/* 6️⃣ FAQ */}
      <FAQs title="Email Marketing FAQs" faqs={emailMarketingFAQs} />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter
        title="📬 Get Email Marketing Tips That Convert"
        subtitle="Join business owners getting expert advice on automations, strategy, and customer engagement — delivered monthly."
      />
    </div>
  );
};

export default EmailMarketingPage;
