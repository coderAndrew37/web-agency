import { Phone, Globe } from "lucide-react";

export const services = [
  {
    category: "Development",
    services: [
      {
        name: "Web Development",
        link: "/services/web-development",
        icon: <Globe size={32} />,
        image: "/images/services/web-dev.jpeg",
      },
      {
        name: "App Development",
        link: "/services/app-development",
        icon: <Phone size={32} />,
        image: "/images/services/app-dev.jpeg",
      },
      {
        name: "M-Pesa Integration",
        link: "/services/mpesa-integration",
        icon: <Phone size={32} />,
        image: "/images/services/mpesa-integration.jpeg",
      },
    ],
  },
  {
    category: "Marketing",
    services: [
      {
        name: "SEO Optimization",
        link: "/services/seo",
        icon: <Globe size={32} />,
        image: "/images/services/seo.jpeg",
      },
      {
        name: "Google Ads",
        link: "/services/google-ads",
        icon: <Globe size={32} />,
        image: "/images/services/google-ads.jpeg",
      },
      {
        name: "Facebook Ads",
        link: "/services/facebook-ads",
        icon: <Globe size={32} />,
        image: "/images/services/fb-ads.jpeg",
      },
      {
        name: "Email Marketing",
        link: "/services/email-marketing",
        icon: <Globe size={32} />,
        image: "/images/services/email-marketing.jpeg",
      },
    ],
  },
];
