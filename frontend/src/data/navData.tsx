import { Phone, Globe } from "lucide-react"; // Replace 'react-icons/fa' with the correct library or file if different.

export const services = [
  {
    category: "Development",
    services: [
      {
        name: "Web Development",
        link: "/services/web-development",
        icon: <Globe size={20} />,
      },
      {
        name: "App Development",
        link: "/services/app-development",
        icon: <Phone size={20} />,
      },
      {
        name: "M-Pesa Integration",
        link: "/services/mpesa-integration",
        icon: <Phone size={20} />,
      },
    ],
  },
  {
    category: "Marketing",
    services: [
      {
        name: "SEO Optimization",
        link: "/services/seo",
        icon: <Globe size={20} />,
      },
      {
        name: "Google Ads",
        link: "/services/google-ads",
        icon: <Globe size={20} />,
      },
      {
        name: "Facebook Ads",
        link: "/services/facebook-ads",
        icon: <Globe size={20} />,
      },
      {
        name: "Email Marketing",
        link: "/services/email-marketing",
        icon: <Globe size={20} />,
      },
    ],
  },
];
