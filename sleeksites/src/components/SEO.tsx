import { Helmet } from "react-helmet-async";
import { frontendUrl } from "../config/constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}

const defaultMeta = {
  title: "SleekSites - Premium Web Solutions",
  description:
    "We build high-performance websites, apps & digital solutions that drive results.",
  image: "/preview.jpg",
  url: `${frontendUrl}`,
  keywords: [
    "web development",
    "mobile app development",
    "SEO services",
    "digital marketing",
    "e-commerce solutions",
    "branding",
    "graphic design",
    "Facebook ads",
    "Google ads",
    "content marketing",
    "lead generation",
    "online presence",
    "website design",
    "website development",
    "website optimization",
    "website maintenance",
    "Fitness Coaching Websites",
    "website development",
    "website developer near me",
    "web developer near me",
    "web hosting",
    "website hosting",
    "website domain",
    "web hosting services",
    "domain hosting",
    "best web hosting",
    "website hosting services",
    "web hosting near me",
  ],
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SleekSites",
  url: "https://sleeksites.co.ke",
  logo: "https://sleeksites.co.ke/logo.png",
  image: "https://sleeksites.co.ke/preview.jpg",
  description:
    "We build high-performance websites, apps & SEO strategies tailored for business owners.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Karen Lane, Nairobi",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi",
    postalCode: "00100",
    addressCountry: "KE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254725746263",
    contactType: "Customer Service",
    areaServed: "KE",
    availableLanguage: ["English", "Swahili"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  priceRange: "$$",
  sameAs: [
    "https://facebook.com/sleeksites",
    "https://twitter.com/sleeksites",
    "https://instagram.com/sleeksites",
  ],
};

const SEO = ({ title, description, image, url }: SEOProps) => {
  const metaTitle = title || defaultMeta.title;
  const metaDesc = description || defaultMeta.description;
  const metaImage = image || defaultMeta.image;
  const metaUrl = url || defaultMeta.url;

  const keywords = title
    ? [...defaultMeta.keywords, title]
    : defaultMeta.keywords;

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta
        name="keywords"
        content={(keywords || defaultMeta.keywords).join(", ")}
      />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify(businessJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
