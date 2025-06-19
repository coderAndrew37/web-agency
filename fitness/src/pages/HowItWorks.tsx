import PageHero from "../components/PageHero";
import Steps from "../components/Steps";
import FAQ from "../components/FAQ";
import CallToAction from "../components/CTA";
import {
  PhoneIcon,
  ClipboardIcon,
  CodeIcon,
  RefreshCwIcon,
  RocketIcon,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Discovery Call",
      description:
        "We start with a 30-minute consultation to understand your coaching business and goals.",
      icon: PhoneIcon,
    },
    {
      title: "Strategy & Planning",
      description:
        "Our team creates a customized website plan tailored to your specific needs.",
      icon: ClipboardIcon,
    },
    {
      title: "Design & Development",
      description:
        "We build your website with your branding and client experience at the forefront.",
      icon: CodeIcon,
    },
    {
      title: "Review & Refine",
      description:
        "You provide feedback and we make revisions until it's perfect.",
      icon: RefreshCwIcon,
    },
    {
      title: "Launch & Training",
      description:
        "We launch your site and train you on managing your content.",
      icon: RocketIcon,
    },
  ];

  const faqs = [
    {
      question: "How long does the process take?",
      answer:
        "Typically 2-4 weeks from start to launch, depending on complexity.",
    },
    {
      question: "Do I need any technical knowledge?",
      answer:
        "Not at all! We handle everything and train you on simple content updates.",
    },
    {
      question: "Can I update my website myself?",
      answer: "Yes! We provide an easy-to-use content management system.",
    },
    {
      question: "What if I need help after launch?",
      answer:
        "We offer ongoing support packages and are always available for questions.",
    },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="Our Simple Website Process"
        subtitle="How It Works"
        description="Getting your professional coaching website shouldn't be complicated. Here's our straightforward 5-step process:"
        primaryButton={{ text: "Start Your Project", link: "/contact" }}
      />

      <Steps
        steps={steps}
        title="From Concept to Launch in 5 Simple Steps"
        bgColor="bg-gray-50"
      />

      <FAQ
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Need more info?"
      />

      <CallToAction
        title="Ready to Get Started?"
        description="Schedule your free consultation today and let's build your dream website"
        primaryButton={{ text: "Book Your Call", link: "/contact" }}
      />
    </div>
  );
};

export default HowItWorks;
