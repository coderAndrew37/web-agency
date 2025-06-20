import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ = ({
  faqs,
  title,
  subtitle,
}: {
  faqs: FaqItem[];
  title: string;
  subtitle?: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {subtitle && (
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              {subtitle}
            </h2>
          )}
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <dl className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <dt className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </dt>
                {openIndex === index && (
                  <dd className="mt-4 text-gray-600">{faq.answer}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
