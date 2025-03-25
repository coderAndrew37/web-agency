import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQs from "../components/FAQ";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { emailMarketingPlans } from "../data/pricingData";
import ServiceContent from "../components/ServiceContent";
import Bonus from "../components/Bonus";
import { UploadCloud, FileText, Search } from "lucide-react";

const emailMarketingFeatures = [
  {
    title: "Automated Email Sequences",
    description: "Engage leads with automated email sequences.",
    icon: (
      <span role="img" aria-label="Automated Email Sequences">
        🔄
      </span>
    ),
  },
  {
    title: "High-Converting Email Copy",
    description: "Persuasive copy that boosts open and click rates.",
    icon: (
      <span role="img" aria-label="High-Converting Email Copy">
        ✍️
      </span>
    ),
  },
  {
    title: "List Segmentation & Personalization",
    description: "Target specific audiences with personalized messages.",
    icon: (
      <span role="img" aria-label="List Segmentation & Personalization">
        🎯
      </span>
    ),
  },
  {
    title: "Analytics & Performance Tracking",
    description: "Track and optimize your email campaign performance.",
    icon: (
      <span role="img" aria-label="Analytics & Performance Tracking">
        📊
      </span>
    ),
  },
];

const emailMarketingProcess = [
  {
    title: "Understanding Your Business & Audience",
    description: "We analyze your market and target audience.",
    icon: (
      <span role="img" aria-label="Understanding Your Business & Audience">
        🏆
      </span>
    ),
  },
  {
    title: "Email Strategy & Copywriting",
    description: "Crafting compelling email sequences for conversions.",
    icon: (
      <span role="img" aria-label="Email Strategy & Copywriting">
        ✍️
      </span>
    ),
  },
  {
    title: "Design & Development",
    description: "Creating visually appealing, responsive emails.",
    icon: (
      <span role="img" aria-label="Design & Development">
        🎨
      </span>
    ),
  },
  {
    title: "A/B Testing & Optimization",
    description: "Testing subject lines, content, and calls to action.",
    icon: (
      <span role="img" aria-label="A/B Testing & Optimization">
        ⚙️
      </span>
    ),
  },
  {
    title: "Analytics & Scaling",
    description: "Tracking performance and scaling winning campaigns.",
    icon: (
      <span role="img" aria-label="Analytics & Scaling">
        📈
      </span>
    ),
  },
];

const emailMarketingFAQs = [
  {
    question: "How much does email marketing cost in Kenya?",
    answer:
      "Our pricing starts from KES 10,000 per month, depending on your campaign size and requirements.",
  },
  {
    question: "How effective is email marketing?",
    answer:
      "Email marketing has one of the highest ROIs in digital marketing, with up to 42x returns per dollar spent.",
  },
  {
    question: "Do you provide email templates?",
    answer: "Yes! We offer custom email templates tailored to your brand.",
  },
  {
    question: "Can I track my email campaign performance?",
    answer:
      "Absolutely! We provide real-time analytics and detailed reports on open rates, click-through rates, and conversions.",
  },
];

const emailMarketingBonuses = [
  {
    icon: UploadCloud, // Replacing <span> with a valid Lucide icon
    title: "Free 1000 Email Contacts Import",
    description:
      "We'll help you import and organize your first 1000 contacts for free.",
  },
  {
    icon: FileText,
    title: "Custom Email Template Design",
    description:
      "Receive a professionally designed email template to match your brand.",
  },
  {
    icon: Search,
    title: "Advanced Email Subject Line Guide",
    description: "Get access to our proven high-converting subject line guide.",
  },
];

const EmailMarketingPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Supercharge Your Sales with Email Marketing 📩"
        subtitle="Engage, nurture, and convert leads into customers with high-converting email campaigns."
        primaryButtonText="Get a Free Email Marketing Strategy"
        primaryButtonAction={() =>
          console.log("Email Marketing Strategy Requested")
        }
        secondaryButtonText="Learn More"
        secondaryButtonAction={() =>
          console.log("Learn More About Email Marketing")
        }
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
      <Bonus bonuses={emailMarketingBonuses} />

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
      <Newsletter />
    </div>
  );
};

export default EmailMarketingPage;
