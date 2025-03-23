const ServiceContent = ({
  title,
  tagline,
  whyNeed,
  comparison,
  benefits,
  ctaText,
  ctaLink,
}: {
  title: string;
  tagline: string;
  whyNeed: string;
  comparison: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary">{title}</h2>
        <p className="text-lg text-center text-gray-600 mt-2">{tagline}</p>

        {/* Why You Need This Service */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800">
            Why You Need This
          </h3>
          <p className="text-gray-700 mt-3">{whyNeed}</p>
        </div>

        {/* Comparison Section */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Comparison</h3>
          <p className="text-gray-700 mt-3">{comparison}</p>
        </div>

        {/* Benefits List */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Key Benefits</h3>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <a
            href={ctaLink}
            className="inline-block bg-primary  px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;
