import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { webDevPlans, webDevFeatures } from "../data/pricingData";

const WebDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="🌍 Build a High-Performance Website"
        subtitle="We create professional websites that drive results for businesses."
        primaryButtonText="Get a Free Consultation"
        primaryButtonAction={() => console.log("Consultation Clicked!")}
        secondaryButtonText="View Portfolio"
        secondaryButtonAction={() => console.log("Portfolio Clicked!")}
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Our Web Development Services?"
        features={[
          {
            title: "SEO-Optimized Websites",
            description: "Rank higher and drive organic traffic to your site.",
            icon: "🔍",
          },
          {
            title: "E-Commerce Ready",
            description: "Boost sales with a user-friendly online store.",
            icon: "🛒",
          },
          {
            title: "Mobile-Responsive Design",
            description: "Your website will look stunning on any device.",
            icon: "📱",
          },
          {
            title: "Fast & Secure",
            description: "Optimized for speed, security, and performance.",
            icon: "⚡",
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
            icon: "📌",
          },
          {
            title: "Design & Prototyping",
            description:
              "Wireframing and UI/UX design to bring your vision to life.",
            icon: "🎨",
          },
          {
            title: "Development & Testing",
            description: "Building a fast, secure, and scalable website.",
            icon: "💻",
          },
          {
            title: "Launch & Ongoing Support",
            description:
              "Ensuring smooth deployment and continuous maintenance.",
            icon: "🚀",
          },
        ]}
      />

      {/* 4️⃣ Pricing Plans */}
      <Pricing title="Web Development Pricing" plans={webDevPlans} />

      {/* 5️⃣ Custom Pricing Calculator */}
      <PricingCalculator
        title="Customize Your Website Package"
        features={webDevFeatures}
        basePrice={80000} // Minimum price for web development
      />

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
