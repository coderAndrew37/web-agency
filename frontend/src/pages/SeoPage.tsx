import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { seoPlans } from "../data/pricingData";
import Bonus from "../components/Bonus";
import FAQ from "../components/FAQ";
import ServiceContent from "../components/ServiceContent";
import { calendlyUrl } from "../config/constants";
import { seoFeatures } from "../data/features";
import { seoFAQs } from "../data/faqs";
import { seoBonuses } from "../data/bonuses";
import { seoProcess } from "../data/processes";

const SeoPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Boost Your Rankings with Expert SEO 🚀"
        subtitle="Get more traffic, more leads, and more sales with our proven SEO strategies."
        primaryButtonText="Get a Free SEO Audit"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About SEO")}
        imageUrl="/images/seo-hero.jpeg" // ✅ SEO page image
        imageAlt="SEO Hero Image"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="SEO That Drives Real Business Growth"
        tagline="Increase visibility, rank higher, and dominate search results."
        whyNeed="SEO is essential for any business looking to increase online visibility and attract organic traffic. Without proper SEO, your website won’t reach its full potential."
        comparison="Unlike paid ads, SEO provides long-term organic traffic without ongoing ad spend, making it a cost-effective marketing strategy."
        benefits={[
          "Higher Google rankings and increased traffic",
          "Long-term, sustainable results",
          "Improved website performance and user experience",
          "More qualified leads and conversions",
        ]}
        ctaText="Start Ranking Higher Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features title="Why Choose Our SEO Services?" features={seoFeatures} />

      {/* 3️⃣ SEO Process */}
      <Process title="Our SEO Strategy" steps={seoProcess} />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="SEO Pricing Plans" plans={seoPlans} />

      <Bonus
        title="🎁 Extra Value With Every SEO Plan"
        subtitle="Every package includes valuable bonuses designed to maximize your long-term SEO success."
        items={seoBonuses.map((bonus) => ({ ...bonus, icon: <bonus.icon /> }))}
      />

      <FAQ title="SEO FAQs" faqs={seoFAQs} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="📈 Ready to Dominate Google?"
        subtitle="Let's Optimize Your Site for Maximum Growth"
        primaryCTA="Request SEO Consultation"
        onPrimaryClick={() => console.log("SEO Consultation Requested")}
      />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter
        title="📬 Get SEO Tips That Drive Revenue"
        subtitle="Join thousands of business owners getting monthly SEO insights to rank higher and win more clients."
      />
    </div>
  );
};

export default SeoPage;
