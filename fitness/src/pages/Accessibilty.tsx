const Accessibility = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>

      <p className="mb-4">
        SleekSites Fitness is committed to making our website accessible and
        usable by everyone, including people with disabilities. We aim to follow
        the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        Accessibility Features
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Keyboard-friendly navigation</li>
        <li>Readable text and consistent layout</li>
        <li>Image alt text and aria labels</li>
        <li>Responsive design for different screen sizes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Need Help?</h2>
      <p className="mb-4">
        If you have difficulty accessing any part of our site, please contact
        us:
      </p>
      <p className="mb-2">
        Email:{" "}
        <a
          href="mailto:access@sleeksites.co.ke"
          className="text-blue-600 hover:underline"
        >
          access@sleeksites.co.ke
        </a>
      </p>
      <p>Phone: +254 712 345 678</p>

      <p className="text-sm mt-10 text-gray-500">Last updated: June 2025</p>
    </main>
  );
};

export default Accessibility;
