import PageHero from "../components/PageHero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CTA";
import { testimonials } from "../data/testimonials";
import {
  ChartBarIcon,
  HeartIcon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react";
import { calendlyUrl } from "../config/constants";

const WhyUs = () => {
  const whyUsFeatures = [
    {
      name: "Industry Expertise",
      description:
        "We specialize exclusively in websites for fitness professionals, understanding your unique needs better than generic agencies.",
      icon: UsersIcon,
    },
    {
      name: "Client-First Approach",
      description:
        "Your success is our priority. We work closely with you to ensure your website perfectly represents your brand.",
      icon: HeartIcon,
    },
    {
      name: "Results-Driven Design",
      description:
        "We don't just build pretty websites - we create conversion-focused experiences that attract and retain clients.",
      icon: ChartBarIcon,
    },
    {
      name: "Ongoing Support",
      description:
        "Get lifetime support and updates to keep your website running smoothly as your business grows.",
      icon: MessageCircleIcon,
    },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="Why Choose Us for Your Ecommerce Website"
        subtitle="Your Success is Our Priority"
        description="We're not just another web design agency. We're ecommerce experts helping brands grow, convert, and thrive online."
        primaryButton={{
          text: "Get Started",
          link: calendlyUrl,
          target: "_blank",
        }}
        secondaryButton={{
          text: "See Our Work",
          link: "https://sleeksites.co.ke/portfolio",
          target: "_blank",
        }}
      />

      <Features
        id="why-us"
        title="The SleekSites Advantage"
        subtitle="Why We're Different"
        description="Here's what sets us apart from generic web design services"
        features={whyUsFeatures}
        bgColor="bg-gray-50"
      />

      <Testimonials
        testimonials={testimonials}
        title="Trusted by Online Sellers"
        subtitle="Testimonials"
      />

      <CallToAction
        title="Ready to Launch Your Store?"
        description="Join successful ecommerce brands who've scaled their revenue with a SleekSite."
        primaryButton={{
          text: "Get Started Today",
          link: calendlyUrl,
          target: "_blank",
        }}
        secondaryButton={{ text: "View Pricing", link: "/pricing" }}
      />
    </div>
  );
};

export default WhyUs;
