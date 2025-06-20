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

const HowItWorks = () => {
  const steps = [
    {
      title: "Discovery Call",
      description:
        "We begin with a 30-minute call to understand your ecommerce goals, products, and brand vision.",
      icon: PhoneIcon,
    },
    {
      title: "Store Planning",
      description:
        "Our team crafts a strategic store layout, payment flow, and category structure tailored to your business.",
      icon: ClipboardIcon,
    },
    {
      title: "Design & Build",
      description:
        "We develop your ecommerce site with your branding, product pages, and essential integrations.",
      icon: CodeIcon,
    },
    {
      title: "Testing & Review",
      description:
        "You test the store, checkout flow, and provide feedback. We refine the experience until it's perfect.",
      icon: RefreshCwIcon,
    },
    {
      title: "Launch & Training",
      description:
        "We go live and train you on managing products, orders, and inventory with ease.",
      icon: RocketIcon,
    },
  ];

  const faqs = [
    {
      question: "How long does it take to launch a store?",
      answer:
        "Usually 2-4 weeks depending on complexity and your content readiness.",
    },
    {
      question: "Can I sell digital or physical products?",
      answer: "Yes! We support both with flexible shipping or download setups.",
    },
    {
      question: "Do you support payment integration?",
      answer: "Absolutely — we integrate M-Pesa, card payments, and more.",
    },
    {
      question: "Will I be able to update my store myself?",
      answer:
        "Yes! We provide training and ongoing support so you're never stuck.",
    },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="How We Launch Your Online Store"
        subtitle="Our 5-Step Ecommerce Process"
        description="From planning to launch — our expert team makes it simple to get your store online and selling fast."
        primaryButton={{ text: "Start Your Project", link: "/contact" }}
      />

      <Steps
        steps={steps}
        title="Launch in 5 Simple Steps"
        bgColor="bg-gray-50"
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Payment Milestones
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            We break your investment into simple phases for flexibility and
            peace of mind:
          </p>

          <ul className="mt-8 space-y-6 text-left">
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>40%</strong> – After Discovery Call & Agreement
              </span>
            </li>
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>30%</strong> – After Store Design & Product Integration
              </span>
            </li>
            <li className="flex items-start">
              <CreditCardIcon className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
              <span className="ml-3 text-gray-700 text-lg">
                <strong>30%</strong> – Just Before Launch & Handover
              </span>
            </li>
          </ul>
        </div>
      </section>

      <FAQ
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before we get started"
      />

      <CallToAction
        title="Ready to Launch Your Store?"
        description="Let’s build a store that sells — from day one."
        primaryButton={{ text: "Book Your Call", link: "/contact" }}
      />
    </div>
  );
};

export default HowItWorks;
