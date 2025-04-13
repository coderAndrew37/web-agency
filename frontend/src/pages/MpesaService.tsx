import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { mpesaPlans } from "../data/pricingData";
import { FileText, BarChart, Wrench } from "lucide-react";
import Bonus from "../components/Bonus";
import FAQ from "../components/FAQ";
import ServiceContent from "../components/ServiceContent";

import { calendlyUrl } from "../config/constants";

const mpesaFeatures = [
  {
    title: "Secure Transactions",
    description: "Ensure encrypted & protected Mpesa payments.",
    icon: (
      <span role="img" aria-label="lock">
        🔒
      </span>
    ),
  },
  {
    title: "Fast & Reliable Processing",
    description: "Get real-time transaction updates.",
    icon: (
      <span role="img" aria-label="lightning">
        ⚡
      </span>
    ),
  },
  {
    title: "Automated Payment Confirmations",
    description: "No need to manually confirm payments.",
    icon: (
      <span role="img" aria-label="envelope">
        📩
      </span>
    ),
  },
  {
    title: "Custom API Solutions",
    description: "We tailor Mpesa API to fit your needs.",
    icon: (
      <span role="img" aria-label="wrench">
        🔧
      </span>
    ),
  },
];

const mpesaProcess = [
  {
    title: "Understanding Your Business Needs",
    description: "Identify how Mpesa fits into your business.",
    icon: (
      <span role="img" aria-label="magnifying glass">
        🧐
      </span>
    ),
  },
  {
    title: "Mpesa API Setup & Configuration",
    description: "Configure APIs for seamless payment processing.",
    icon: (
      <span role="img" aria-label="gear">
        ⚙️
      </span>
    ),
  },
  {
    title: "Testing & Quality Assurance",
    description: "Ensure smooth transactions with test environments.",
    icon: (
      <span role="img" aria-label="check mark">
        ✅
      </span>
    ),
  },
  {
    title: "Deployment & Go Live",
    description: "Launch the integration and start accepting payments.",
    icon: (
      <span role="img" aria-label="rocket">
        🚀
      </span>
    ),
  },
  {
    title: "Ongoing Support & Maintenance",
    description: "We provide ongoing technical support.",
    icon: (
      <span role="img" aria-label="tools">
        🛠️
      </span>
    ),
  },
];

const mpesaFAQs = [
  {
    question: "How long does Mpesa integration take?",
    answer:
      "Integration typically takes between 3-7 days, depending on business requirements.",
  },
  {
    question: "Do I need a Paybill or Till Number?",
    answer:
      "Yes, you need a registered Mpesa Paybill or Till Number for seamless integration.",
  },
  {
    question: "What are the transaction fees?",
    answer:
      "Mpesa charges standard transaction fees. We help you optimize costs by recommending the best payment structure.",
  },
  {
    question: "Can I automate payment confirmations?",
    answer:
      "Yes! Our integration ensures automatic confirmation and reconciliation of transactions.",
  },
];

const mpesaBonuses = [
  {
    title: "Free API Setup Guide",
    description:
      "A step-by-step guide to help you understand Mpesa API integration.",
    icon: FileText,
  },
  {
    title: "One-Month Free Support",
    description:
      "Get technical support for your integration at no extra cost for the first month.",
    icon: Wrench,
  },
  {
    title: "Transaction Cost Optimization Report",
    description:
      "We analyze your business needs and suggest ways to reduce transaction costs.",
    icon: BarChart,
  },
];

const MpesaIntegrationPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Seamless Mpesa Integration for Your Business 💰"
        subtitle="Accept payments directly into your bank or mobile wallet with our fast & secure Mpesa API integration."
        primaryButtonText="Get a Free Consultation"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About Mpesa")}
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
      <Bonus bonuses={mpesaBonuses} />

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
      <Newsletter />
    </div>
  );
};

export default MpesaIntegrationPage;
