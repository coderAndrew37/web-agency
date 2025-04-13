import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { webDevPlans, webDevFeatures } from "../data/pricingData";
import Bonus from "../components/Bonus";
import ServiceContent from "../components/ServiceContent";
import { Search, Palette, Laptop } from "lucide-react";
import FAQ from "../components/FAQ";
import { calendlyUrl } from "../config/constants";

const webDevFAQs = [
  {
    question: "How long does it take to build a website?",
    answer: "Depending on complexity, we typically deliver within 2-6 weeks.",
  },
  {
    question: "Do you offer SEO services?",
    answer:
      "Yes! All our websites are built with SEO best practices to help rank higher on Google.",
  },
  {
    question: "Can I update my website myself?",
    answer:
      "Absolutely! We provide an easy-to-use CMS, so you can manage content without coding knowledge.",
  },
  {
    question: "What if I need additional features later?",
    answer:
      "We offer scalable solutions and ongoing support to add features as your business grows.",
  },
];

const webDevBonuses = [
  {
    title: "SEO Starter Guide",
    description:
      "Get a step-by-step guide to optimize your website for search engines.",
    icon: Search,
  },
  {
    title: "Content Strategy Session",
    description:
      "A 1-hour consultation to help you craft a winning content strategy.",
    icon: Palette,
  },

  {
    title: "Website Maintenance Guide",
    description: "Learn how to keep your website secure, fast, and up-to-date.",
    icon: Laptop,
  },
];

const WebDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="🌍 Build a High-Performance Website"
        subtitle="We create professional websites that drive results for businesses."
        primaryButtonText="Book a Free Consultation"
        secondaryButtonText="View Portfolio"
        secondaryButtonAction={() => console.log("Portfolio Clicked!")}
        calendlyUrl={calendlyUrl}
      />

      <ServiceContent
        title="High-Performance Web Development"
        tagline="A website is your 24/7 online storefront—let's build yours!"
        whyNeed="In today's digital world, businesses without a website miss out on countless opportunities. A website builds trust, boosts credibility, and allows you to reach a global audience."
        comparison="Unlike social media, a website gives you full control over branding, SEO, and lead generation. Social platforms change algorithms, but your website is always yours."
        benefits={[
          "Professional online presence",
          "Higher ranking on Google (SEO benefits)",
          "Full customization & branding control",
          "Scalable as your business grows",
        ]}
        ctaText="Get Your Website Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Our Web Development Services?"
        features={[
          {
            title: "SEO-Optimized Websites",
            description: "Rank higher and drive organic traffic to your site.",
            icon: (
              <span role="img" aria-label="search">
                🔍
              </span>
            ),
          },
          {
            title: "E-Commerce Ready",
            description: "Boost sales with a user-friendly online store.",
            icon: (
              <span role="img" aria-label="shopping cart">
                🛒
              </span>
            ),
          },
          {
            title: "Mobile-Responsive Design",
            description: "Your website will look stunning on any device.",
            icon: (
              <span role="img" aria-label="mobile phone">
                📱
              </span>
            ),
          },
          {
            title: "Fast & Secure",
            description: "Optimized for speed, security, and performance.",
            icon: (
              <span role="img" aria-label="lightning bolt">
                ⚡
              </span>
            ),
          },
        ]}
      />

      {/* 3️⃣ Web Development Process */}
      <Process
        title="Our Web Development Process"
        steps={[
          {
            title: "Consultation & Planning",
            description: "We define your goals and create a strategy.",
            icon: (
              <span role="img" aria-label="pushpin">
                📌
              </span>
            ),
          },
          {
            title: "Design & Prototyping",
            description:
              "Wireframing and UI/UX design to bring your vision to life.",
            icon: (
              <span role="img" aria-label="palette">
                🎨
              </span>
            ),
          },
          {
            title: "Development & Testing",
            description: "Building a fast, secure, and scalable website.",
            icon: (
              <span role="img" aria-label="laptop">
                💻
              </span>
            ),
          },
          {
            title: "Launch & Ongoing Support",
            description:
              "Ensuring smooth deployment and continuous maintenance.",
            icon: (
              <span role="img" aria-label="rocket">
                🚀
              </span>
            ),
          },
        ]}
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

      {/* 7️⃣ Frequently Asked Questions */}
      <FAQ title="Web Development FAQs" faqs={webDevFAQs} />

      {/* 6️⃣ Call-to-Action */}
      <CTA
        title="🚀 Ready to Build Your Website?"
        subtitle="Let's bring your vision to life with a high-performing website."
        primaryCTA="Get a Free Quote"
        onPrimaryClick={() => console.log("Quote Requested!")}
      />

      {/* 7️⃣ Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default WebDevelopmentPage;
