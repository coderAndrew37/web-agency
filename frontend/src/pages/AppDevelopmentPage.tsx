import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import TechnologiesWeUse from "../components/TechnologiesWeUse";
import PortfolioShowcase from "../components/PortfolioShowcase";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import Bonus from "../components/Bonus";
import FAQ from "../components/FAQ";
import { appDevPlans, appDevFeatures } from "../data/pricingData";
import ServiceContent from "../components/ServiceContent";
import {
  Code,
  Smartphone,
  Rocket,
  ShieldCheck,
  Database,
  Zap,
} from "lucide-react";

import { calendlyUrl } from "../config/constants";

const techStack = [
  { name: "React Native", icon: <Code size={40} className="text-blue-500" /> },
  { name: "Flutter", icon: <Smartphone size={40} className="text-blue-400" /> },
  { name: "Swift", icon: <Rocket size={40} className="text-orange-500" /> },
  {
    name: "Kotlin",
    icon: <ShieldCheck size={40} className="text-purple-500" />,
  },
  {
    name: "Firebase",
    icon: <Database size={40} className="text-yellow-500" />,
  },
  { name: "Node.js", icon: <Zap size={40} className="text-green-500" /> },
];

const appProjects = [
  {
    name: "E-Commerce Mobile App",
    description: "A seamless shopping experience with real-time updates.",
    features: ["Secure Payments", "Push Notifications", "Live Chat Support"],
    image: "/images/ecommerce-app.jpg",
  },
  {
    name: "Fitness Tracking App",
    description: "Track workouts and health stats in real-time.",
    features: ["AI Workout Suggestions", "Daily Health Reports"],
    image: "/images/fitness-app.jpg",
  },
  {
    name: "Food Delivery App",
    description: "Order food from top restaurants with real-time tracking.",
    features: ["Live Order Tracking", "Secure Payments", "User Ratings"],
    image: "/images/food-app.jpg",
  },
];

const appFAQs = [
  {
    question: "How long does it take to develop an app?",
    answer:
      "App development typically takes 8-12 weeks, depending on complexity.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes! We offer ongoing maintenance and updates for all our apps.",
  },
  {
    question: "Can my app be published on both iOS and Android?",
    answer: "Absolutely! We specialize in cross-platform development.",
  },
  {
    question: "How do you ensure app security?",
    answer:
      "We use encryption, authentication, and secure coding practices to keep your app safe.",
  },
];

const AppDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="📱 Build a High-Performance Mobile App"
        subtitle="From idea to launch, we create powerful mobile applications."
        primaryButtonText="Request a Free Consultation"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Explore Case Studies"
        secondaryButtonAction={() => console.log("Case Studies Clicked!")}
        imageUrl="/images/services/app-dev.jpeg"
        imageAlt="Mobile App Development"
      />

      {/* 2️⃣ Service Content - SEO Optimized */}
      <ServiceContent
        title="Custom Mobile App Development"
        tagline="Empower your business with a high-performance mobile application."
        whyNeed="In the modern digital landscape, mobile apps drive engagement, boost customer retention, and streamline business operations. Without an app, businesses miss out on direct communication and sales opportunities."
        comparison="Unlike traditional websites, mobile apps offer superior user experience, real-time notifications, and offline accessibility—giving businesses a competitive edge."
        benefits={[
          "Seamless cross-platform experience (iOS & Android)",
          "Enhanced user engagement and retention",
          "Increased brand visibility and credibility",
          "Scalable architecture for future growth",
        ]}
        ctaText="Start Your App Development Today"
        ctaLink="/contact"
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Our App Development Services?"
        features={[
          {
            title: "Tailored Mobile Solutions",
            description: "We build custom apps for startups and enterprises.",
            icon: <Code size={24} />,
          },
          {
            title: "Cross-Platform Development",
            description: "Develop once, deploy on Android & iOS.",
            icon: <Smartphone size={24} />,
          },
          {
            title: "Secure & Scalable",
            description: "Built with robust security and scalability in mind.",
            icon: <ShieldCheck size={24} />,
          },
          {
            title: "Full Maintenance & Support",
            description: "Ongoing updates and optimization post-launch.",
            icon: <Zap size={24} />,
          },
        ]}
      />

      {/* 3️⃣ App Development Process */}
      <Process
        title="Our App Development Process"
        steps={[
          {
            title: "Idea & Planning",
            description: "Define goals, audience, and roadmap.",
            icon: (
              <span role="img" aria-label="pin">
                📌
              </span>
            ),
          },
          {
            title: "Design & Prototyping",
            description: "Create intuitive UI/UX wireframes.",
            icon: (
              <span role="img" aria-label="palette">
                🎨
              </span>
            ),
          },
          {
            title: "Development & Testing",
            description: "Build and rigorously test the application.",
            icon: (
              <span role="img" aria-label="laptop">
                💻
              </span>
            ),
          },
          {
            title: "Launch & Ongoing Support",
            description: "Deploy app and provide continuous updates.",
            icon: (
              <span role="img" aria-label="rocket">
                🚀
              </span>
            ),
          },
        ]}
      />

      {/* 4️⃣ Technologies We Use */}
      <TechnologiesWeUse technologies={techStack} />

      {/* 5️⃣ Portfolio Showcase */}
      <PortfolioShowcase projects={appProjects} />

      {/* 6️⃣ Pricing Plans */}
      <Pricing title="App Development Pricing" plans={appDevPlans} />

      {/* 7️⃣ Custom Pricing Calculator */}
      <PricingCalculator
        title="Customize Your App Development Package"
        features={appDevFeatures}
        basePrice={100000} // Minimum price for app development
      />

      {/* 8️⃣ Bonuses Section */}
      <Bonus />

      {/* 9️⃣ Frequently Asked Questions */}
      <FAQ title="App Development FAQs" faqs={appFAQs} />

      {/* 10️⃣ Call-to-Action */}
      <CTA
        title="🚀 Ready to Launch Your App?"
        subtitle="Let's transform your idea into a world-class mobile application."
        primaryCTA="Start Your Project"
        onPrimaryClick={() => console.log("Project Started!")}
      />

      {/* 11️⃣ Newsletter */}
      <Newsletter />
    </div>
  );
};

export default AppDevelopmentPage;
