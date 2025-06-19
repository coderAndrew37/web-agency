const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-4">
        At SleekSites Fitness, your privacy is important to us. This policy
        outlines how we collect, use, and protect your personal data in
        compliance with the Data Protection Act of Kenya.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Full name, email address, and phone number when you submit a contact
          form
        </li>
        <li>Details about your coaching business and website needs</li>
        <li>Technical data like browser type, device, and IP address</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To respond to your inquiries and requests</li>
        <li>To provide our services and process payments</li>
        <li>To improve our website and user experience</li>
        <li>
          To send you relevant updates, offers, or newsletters (you may opt out)
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We take data protection seriously and implement appropriate technical
        and organizational measures to safeguard your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        4. Third-Party Services
      </h2>
      <p className="mb-4">
        We may use trusted third-party tools such as email marketing providers,
        analytics platforms, and payment processors. We ensure these vendors
        comply with data protection requirements.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access and update your personal data</li>
        <li>Request data deletion or correction</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact Us</h2>
      <p>
        If you have any questions or concerns about our privacy policy, please
        email us at:
        <a
          href="mailto:privacy@sleeksites.co.ke"
          className="text-blue-600 hover:underline"
        >
          privacy@sleeksites.co.ke
        </a>
      </p>

      <p className="text-sm mt-10 text-gray-500">Last updated: June 2025</p>
    </main>
  );
};

export default PrivacyPolicy;
