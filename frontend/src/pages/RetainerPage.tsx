import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Testimonials from "../components/TestimonialList";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Newsletter from "../components/Newsletter";

const RetainerPage = () => {
  return (
    <div>
      {/* 🏆 Hero Section */}
      <Hero
        title="🚀 Done-For-You Marketing & Growth"
        subtitle="The #1 Retainer Service for Kenyan Businesses Serious About Scaling"
        primaryButtonText="Book a Free Strategy Call"
        primaryButtonAction={() => console.log("Consultation Clicked!")}
        secondaryButtonText="See Client Results"
        secondaryButtonAction={() => console.log("Results Clicked!")}
      />

      {/* ✅ Why Choose a Retainer Plan? */}
      <Features
        title="Why Choose a Monthly Retainer?"
        features={[
          {
            title: "🚀 Scalable Growth",
            description:
              "Our team ensures your business grows month-over-month.",
            icon: <span>📈</span>,
          },
          {
            title: "💰 High ROI",
            description: "Marketing that pays for itself in new revenue.",
            icon: <span>💵</span>,
          },
          {
            title: "🔄 Done-For-You Execution",
            description: "We handle everything, you focus on your business.",
            icon: <span>⚡</span>,
          },
          {
            title: "📊 Transparent Results",
            description: "Monthly reports & insights for full accountability.",
            icon: <span>📑</span>,
          },
        ]}
      />

      {/* 💵 Pricing Plans */}
      <Pricing
        title="Choose Your Growth Plan"
        plans={[
          {
            name: "🚀 Starter Plan",
            price: "KES 50,000/mo",
            features: [
              "✅ 24/7 Website Maintenance",
              "✅ SEO Optimization",
              "✅ Social Media (8 Posts/Month)",
            ],
          },
          {
            name: "🔥 Growth Plan",
            price: "KES 150,000/mo",
            features: [
              "✅ Everything in Starter",
              "✅ Facebook & Google Ads (Ksh 30k Budget)",
              "✅ Email Marketing & Lead Funnels",
            ],
          },
          {
            name: "🏆 Elite Plan",
            price: "KES 300,000+/mo",
            features: [
              "✅ Everything in Growth",
              "✅ AI Chatbots & Sales Funnels",
              "✅ VIP Support & Strategy",
            ],
          },
        ]}
      />

      {/* ⭐ Success Stories */}
      <Testimonials />

      {/* ❓ Frequently Asked Questions */}
      <FAQ />

      {/* 🎯 Call-To-Action */}
      <CTA
        title="🔥 Book a Free Growth Strategy Call"
        subtitle="See how our team can help your business scale predictably every month."
        primaryCTA="Schedule a Call"
        onPrimaryClick={() => console.log("Call Scheduled!")}
      />

      {/* ✉️ Newsletter */}
      <Newsletter
        title="Subscribe to Our Newsletter"
        subtitle="Stay up-to-date with our latest growth tips and strategies."
      />
    </div>
  );
};

export default RetainerPage;
