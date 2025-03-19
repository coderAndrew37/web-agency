import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "SEO Optimization",
    description:
      "Rank higher on Google with keyword-optimized content, technical SEO, and blazing-fast speeds.",
    icon: "🔍",
  },
  {
    title: "Blazing-Fast Performance",
    description:
      "53% of users leave if a page takes over 3 seconds to load. We optimize speed for better conversions.",
    icon: "⚡",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "SSL encryption, DDoS protection, and auto backups keep your site secure & hacker-proof.",
    icon: "🛡️",
  },
  {
    title: "Conversion-Optimized Design",
    description:
      "We build websites that SELL with strategic CTAs, smooth navigation, and trust elements.",
    icon: "🎯",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Ksh 20,000",
    features: ["1-Page Website", "Mobile-Responsive", "Basic SEO"],
  },
  {
    name: "Business",
    price: "Ksh 35,000",
    features: ["Up to 5 Pages", "Advanced SEO", "Custom Design"],
  },
  {
    name: "Premium",
    price: "Ksh 50,000+",
    features: [
      "Unlimited Pages",
      "E-commerce Ready",
      "Full Branding & Security",
    ],
  },
];

const WebDevPageFeatures = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".feature-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      className="bg-gray-900 text-white"
      style={{ backgroundColor: colors.background }}
    >
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">
          Build a <span style={{ color: colors.primary }}>Premium Website</span>{" "}
          That Converts 🚀
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          We craft high-performance, conversion-focused websites that scale your
          business.
        </p>
      </section>

      {/* Key Features Section */}
      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Why Choose Our Web Development?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-primary transition"
              >
                <div className="text-5xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                <p className="text-gray-400 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            Web Development Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="p-6 border border-gray-700 rounded-lg bg-gray-900 hover:border-primary transition"
              >
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="text-primary text-3xl font-bold mt-2">
                  {plan.price}
                </p>
                <ul className="mt-4 space-y-2 text-gray-400">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>
                <button className="mt-6 px-6 py-3 bg-primary text-dark font-bold rounded-full shadow-md hover:scale-105 transition">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold">Ready to Scale Your Business? 🚀</h2>
        <p className="text-lg text-gray-400 mt-4">
          Let’s build a website that works while you sleep.
        </p>
        <button className="mt-6 px-8 py-4 bg-primary text-dark font-bold text-lg rounded-full shadow-md hover:scale-105 transition">
          Book a Free Consultation
        </button>
      </section>
    </div>
  );
};

export default WebDevPageFeatures;
