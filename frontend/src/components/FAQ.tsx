import { useState } from "react";
import { ChevronDown } from "lucide-react";
import colors from "../styles/colors";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Depending on the complexity, we typically deliver within 2-4 weeks.",
  },
  {
    question: "Do you offer SEO optimization?",
    answer: "Yes! All our websites are SEO-optimized to rank higher on Google.",
  },
  {
    question: "Can I update my website after it's built?",
    answer: "Absolutely! We provide an easy-to-use CMS for non-tech users.",
  },
  {
    question: "What if I need additional features later?",
    answer:
      "We offer ongoing support and can scale your website as your business grows.",
  },
];

const FAQ = ({
  title = "Frequently Asked Questions",
  faqs = defaultFAQs,
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold">{title}</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-5 cursor-pointer shadow-md hover:shadow-xl transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
