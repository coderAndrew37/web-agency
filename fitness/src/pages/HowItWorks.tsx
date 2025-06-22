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
  CreditCardIcon,
} from "lucide-react";
import { calendlyUrl } from "../config/constants";

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
        primaryButton={{
          text: "Start Your Project",
          link: calendlyUrl,
          target: "_blank",
        }}
      />

      <Steps
        steps={steps}
        title="From Concept to Launch in 5 Simple Steps"
        bgColor="bg-gray-50"
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Payment Milestones
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            To make our projects affordable and low-risk, we break payments into
            clear phases:
          </p>

          <ul className="mt-8 space-y-6 text-left">
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>40%</strong> – After Discovery Call and Project
                Confirmation
              </span>
            </li>
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>30%</strong> – After Design Presentation and Revisions
              </span>
            </li>
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>30%</strong> – Just Before Launch and Handover
              </span>
            </li>
          </ul>
        </div>
      </section>

      <FAQ
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Need more info?"
      />

      <CallToAction
        title="Ready to Get Started?"
        description="Schedule your free consultation today and let's build your dream website"
        primaryButton={{
          text: "Book Your Call",
          link: calendlyUrl,
          target: "_blank",
        }}
      />
    </div>
  );
};

export default HowItWorks;
