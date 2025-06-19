// src/pages/Sitemap.tsx
import { Link } from "react-router-dom";

const Sitemap = () => {
  const pages = [
    { path: "/", label: "Home" },
    { path: "/pricing", label: "Pricing" },
    { path: "/free-resources", label: "Free Resources" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/contact", label: "Contact" },
    { path: "/why-us", label: "Why Choose Us" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/website-in-a-week", label: "Website in a Week" },
    { path: "/blog-posts", label: "Blog" },
    { path: "/privacy-policy", label: "Privacy Policy" },
    { path: "/terms-and-conditions", label: "Terms & Conditions" },
    { path: "/accessibility", label: "Accessibility" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <ul className="space-y-4">
        {pages.map((page) => (
          <li key={page.path}>
            <Link
              to={page.path}
              className="text-blue-600 hover:underline text-lg"
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm mt-10 text-gray-500">Last updated: June 2025</p>
    </main>
  );
};

export default Sitemap;
