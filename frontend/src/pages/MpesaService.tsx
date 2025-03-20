import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { mpesaPlans } from "../data/pricingData";

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

const MpesaIntegrationPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="Seamless Mpesa Integration for Your Business 💰"
        subtitle="Accept payments directly into your bank or mobile wallet with our fast & secure Mpesa API integration."
        primaryButtonText="Get a Free Consultation"
        primaryButtonAction={() => console.log("Mpesa Consultation Requested")}
        secondaryButtonText="Learn More"
        secondaryButtonAction={() => console.log("Learn More About Mpesa")}
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
