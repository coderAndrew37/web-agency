import {
  Code,
  Database,
  Rocket,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import Bonus from "../components/Bonus";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Portfolio from "../components/PortfolioShowcase";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import Process from "../components/Process";
import ServiceContent from "../components/ServiceContent";
import TechnologiesWeUse from "../components/TechnologiesWeUse";
import { appDevFeatures, appDevPlans } from "../data/pricingData";

import { calendlyUrl, frontendUrl } from "../config/constants";
import { appDevBonuses } from "../data/bonuses";
import { appFAQs } from "../data/faqs";
import { appFeatures } from "../data/features";
import { appDevProcess } from "../data/processes";
import { appProjects } from "../data/projects";
import SEO from "../components/seo/Seo";

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

const AppDevelopmentPage = () => {
  return (
    <div>
      <SEO
        title="Mobile App Development Services | SleekSites"
        description="Transform your business with our expert mobile app development services. Get a custom app that drives results."
        image="/images/services/app-dev.jpeg"
        url={`${frontendUrl}/services/app-development`}
        keywords={[
          "mobile app development",
          "custom app development",
          "iOS app development",
          "Android app development",
          "cross-platform apps",
          "app development services",
          "business mobile apps",
        ]}
      />

      {/* 1️⃣ Hero Section */}
      <Hero
        title="📱 Build a High-Performance Mobile App"
        subtitle="From idea to launch, we create powerful mobile applications."
        primaryButtonText="Request a Free Consultation"
        calendlyUrl={calendlyUrl}
        secondaryButtonText="Explore Case Studies"
        secondaryButtonAction={() => (window.location.href = "/portfolio")}
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
        features={appFeatures}
      />

      {/* 3️⃣ App Development Process */}
      <Process title="Our App Development Process" steps={appDevProcess} />

      {/* 4️⃣ Technologies We Use */}
      <TechnologiesWeUse technologies={techStack} />

      {/* 5️⃣ Portfolio Showcase */}
      <Portfolio
        projects={appProjects.map((project) => ({
          title: project.title,
          imageUrl: project.imageUrl, // Assuming the correct property is 'imageUrl'
          description: project.description,
          features: project.features,
        }))}
      />

      {/* 6️⃣ Pricing Plans */}
      <Pricing title="App Development Pricing" plans={appDevPlans} />

      {/* 7️⃣ Custom Pricing Calculator */}
      <PricingCalculator
        title="Customize Your App Development Package"
        features={appDevFeatures}
        basePrice={100000} // Minimum price for app development
      />

      {/* 8️⃣ Bonuses Section */}
      <Bonus
        title="🎁 What You'll Get"
        subtitle="These extras come at no additional cost."
        items={appDevBonuses.map((bonus) => ({
          ...bonus,
          icon: <bonus.icon />,
        }))}
      />

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
      <Newsletter
        title="📬 Stay Updated on App Development Trends"
        subtitle="Join thousands of business owners getting monthly insights on mobile apps, growth strategies, and success stories."
      />
    </div>
  );
};

export default AppDevelopmentPage;
