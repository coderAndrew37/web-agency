import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import ServiceContent from "../components/ServiceContent";
import { mpesaBonuses } from "../data/bonuses";
import { mpesaFAQs } from "../data/faqs";
import { mpesaFeatures } from "../data/features";
import { mpesaPlans } from "../data/pricingData";
import { mpesaProcess } from "../data/processes";
import SEO from "../components/seo/Seo";
import { calendlyUrl, frontendUrl } from "../config/constants";

const MpesaIntegrationPage = () => {
  return (
    <div>
      <SEO
        title="Mpesa Integration Services | SleekSites"
        description="Seamless Mpesa integration for your business. Accept payments directly into your bank or mobile wallet."
        image="/images/mpesa-hero.jpeg"
        url={`${frontendUrl}/services/mpesa-integration`}
        keywords={[
          "Mpesa integration",
          "Mpesa API",
          "mobile payments",
          "payment gateway",
          "business payments",
          "Kenya payments",
          "Mpesa services",
          "Daraja",
          "Mpesa API integration",
          "Mpesa payment solutions",
        ]}
      />

      {/* 1️⃣ Hero Section */}
      <Hero
        title="Seamless Mpesa Integration for Your Business 💰"
        subtitle="Accept payments directly into your bank or mobile wallet with our fast & secure Mpesa API integration."
        primaryButtonText="Get a Free Consultation"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About Mpesa")}
        imageUrl="/images/mpesa-hero.jpeg"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="Effortless Mpesa Payment Integration"
        tagline="Enable secure and seamless transactions for your business."
        whyNeed="Mpesa is the leading mobile money service in Kenya, allowing businesses to receive payments instantly. Without a proper integration, you risk losing potential customers who prefer Mpesa over other payment options."
        comparison="Unlike manual transactions, automated Mpesa integration ensures real-time payments, instant confirmations, and efficient bookkeeping."
        benefits={[
          "Secure, encrypted transactions",
          "Automated payment processing",
          "Real-time transaction tracking",
          "Scalability to handle large transaction volumes",
        ]}
        ctaText="Get Your Mpesa Integration Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Our Mpesa Integration?"
        features={mpesaFeatures}
      />

      {/* 3️⃣ Mpesa Integration Process */}
      <Process title="Our Mpesa Integration Process" steps={mpesaProcess} />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Mpesa Integration Pricing" plans={mpesaPlans} />

      {/* 6️⃣ Bonuses Section */}
      <Bonus
        title="🎁 Added Value for Your Mpesa Integration"
        subtitle="Every integration includes tools and features to help your business accept payments faster and smarter."
        items={mpesaBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))}
      />

      {/* 7️⃣ Frequently Asked Questions */}
      <FAQ title="Mpesa Integration FAQs" faqs={mpesaFAQs} />

      {/* 5️⃣ Call to Action */}
      <CTA
        title="💰 Start Accepting Mpesa Payments Today!"
        subtitle="Let's integrate Mpesa into your business seamlessly."
        primaryCTA="Request Integration"
        onPrimaryClick={() => console.log("Mpesa Integration Requested")}
      />

      {/* 6️⃣ Newsletter Signup */}
      <Newsletter
        title="📬 Stay Ahead in Mobile Payments"
        subtitle="Join other business owners getting updates on payment tech, automation, and revenue growth tips."
      />
    </div>
  );
};

export default MpesaIntegrationPage;
