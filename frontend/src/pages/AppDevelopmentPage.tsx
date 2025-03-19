import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import TechnologiesWeUse from "../components/TechnologiesWeUse";
import PortfolioShowcase from "../components/PortfolioShowcase";
import Pricing from "../components/Pricing";
import PricingCalculator from "../components/PricingCalculator";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";
import { appDevPlans, appDevFeatures } from "../data/pricingData";

const techStack = [
  { name: "React Native", logo: "/images/react-native.png" },
  { name: "Flutter", logo: "/images/flutter.png" },
  { name: "Swift", logo: "/images/swift.png" },
  { name: "Kotlin", logo: "/images/kotlin.png" },
  { name: "Firebase", logo: "/images/firebase.png" },
  { name: "Node.js", logo: "/images/nodejs.png" },
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

const AppDevelopmentPage = () => {
  return (
    <div>
      {/* 1️⃣ Hero Section */}
      <Hero
        title="📱 Build a High-Performance Mobile App"
        subtitle="From idea to launch, we create powerful mobile applications."
        primaryButtonText="Request a Free Consultation"
        primaryButtonAction={() => console.log("Consultation Clicked!")}
        secondaryButtonText="Explore Case Studies"
        secondaryButtonAction={() => console.log("Case Studies Clicked!")}
      />

      {/* 2️⃣ Why Choose Us */}
      <Features
        title="Why Choose Our App Development Services?"
        features={[
          {
            title: "Tailored Mobile Solutions",
            description: "We build custom apps for startups and enterprises.",
            icon: "🔧",
          },
          {
            title: "Cross-Platform Development",
            description: "Develop once, deploy on Android & iOS.",
            icon: "📲",
          },
          {
            title: "Secure & Scalable",
            description: "Built with robust security and scalability in mind.",
            icon: "🔒",
          },
          {
            title: "Full Maintenance & Support",
            description: "Ongoing updates and optimization post-launch.",
            icon: "🔄",
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
            icon: "📌",
          },
          {
            title: "Design & Prototyping",
            description: "Create intuitive UI/UX wireframes.",
            icon: "🎨",
          },
          {
            title: "Development & Testing",
            description: "Build and rigorously test the application.",
            icon: "💻",
          },
          {
            title: "Launch & Ongoing Support",
            description: "Deploy app and provide continuous updates.",
            icon: "🚀",
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

      {/* 8️⃣ Call-to-Action */}
      <CTA
        title="🚀 Ready to Launch Your App?"
        subtitle="Let's transform your idea into a world-class mobile application."
        primaryCTA="Start Your Project"
        onPrimaryClick={() => console.log("Project Started!")}
      />

      {/* 9️⃣ Newsletter */}
      <Newsletter />
    </div>
  );
};

export default AppDevelopmentPage;
