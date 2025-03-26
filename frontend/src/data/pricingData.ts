// src/data/pricingData.ts

export const webDevPlans = [
  {
    name: "Basic",
    price: "Ksh 20,000",
    features: ["1-Page Website", "Basic SEO", "Mobile Friendly"],
  },
  {
    name: "Business",
    price: "Ksh 40,000",
    features: ["Up to 15 Pages", "SEO Optimization", "E-commerce Ready"],
    highlight: true, // ⭐ Premium plan gets the "Popular" tag
  },
  {
    name: "Premium",
    price: "Ksh 50,000+",
    features: ["Custom Features", "Advanced SEO", "Full Branding"],
  },
];

export const appDevPlans = [
  {
    name: "Basic",
    price: "Ksh 100,000",
    features: ["Simple UI", "Core Features", "Basic Support"],
    highlight: true,
  },
  {
    name: "Standard",
    price: "Ksh 180,000",
    features: ["Advanced Features", "API Integration", "1 Year Support"],
  },
  {
    name: "Premium",
    price: "Ksh 300,000+",
    features: ["Custom Features", "Full Branding", "Ongoing Maintenance"],
  },
];

export const facebookAdsPlans = [
  {
    name: "Starter Package",
    price: "Ksh 15,000",
    features: ["Campaign Setup", "Basic Targeting", "Performance Report"],
  },
  {
    name: "Growth Package",
    price: "Ksh 30,000",
    features: [
      "Custom Audience Targeting",
      "A/B Testing",
      "Advanced Performance Report",
    ],
    highlight: true, // 🚀 Premium plan gets the "Popular" tag
  },
  {
    name: "Enterprise Package",
    price: "Custom Pricing",
    features: [
      "High-Budget Ad Management",
      "Sales Funnel Optimization",
      "Dedicated Ad Specialist",
    ],
  },
];

export const webDevFeatures = [
  { name: "E-Commerce Functionality", price: 20000 },
  { name: "SEO Optimization", price: 5000 },
  { name: "Speed Optimization", price: 3000 },
  { name: "Security Enhancements", price: 4000 },
  { name: "Custom Animations", price: 6000 },
  { name: "CMS Integration", price: 10000 },
  { name: "Blog Setup", price: 7000 },
  { name: "Live Chat & Support", price: 8000 },
  { name: "Analytics & Tracking", price: 5000 },
  { name: "Custom Forms & Automation", price: 6000 },
  { name: "Membership System", price: 15000 },
  { name: "API Integrations", price: 12000 },
];

export const appDevFeatures = [
  { name: "UI/UX Design", price: 15000 },
  { name: "Cross-Platform Support", price: 25000 },
  { name: "Push Notifications", price: 8000 },
  { name: "Payment Integration", price: 18000 },
  { name: "User Authentication", price: 12000 },
  { name: "Offline Functionality", price: 10000 },
  { name: "Real-time Chat", price: 15000 },
  { name: "Analytics & Monitoring", price: 8000 },
];

export const facebookAdsFeatures = [
  { name: "Custom Audience Targeting", price: 10000 },
  { name: "Retargeting Campaigns", price: 8000 },
  { name: "Lookalike Audiences", price: 7000 },
  { name: "A/B Split Testing", price: 5000 },
  { name: "Video Ad Creation", price: 15000 },
  { name: "Carousel Ads", price: 6000 },
  { name: "Lead Generation Forms", price: 10000 },
  { name: "E-commerce Conversion Ads", price: 12000 },
  { name: "Messenger Bot Integration", price: 8000 },
];

export const mpesaPlans = [
  {
    name: "Basic Integration",
    price: "Ksh 20,000",
    features: ["STK Push Integration", "Payment Confirmation", "Basic Reports"],
  },
  {
    name: "Advanced Integration",
    price: "Ksh 40,000",
    features: ["STK + B2C Payments", "Automated Refunds", "Detailed Analytics"],
    highlight: true, // ⭐ Premium Plan
  },
  {
    name: "Enterprise Solution",
    price: "Ksh 80,000+",
    features: ["Full API Integration", "Custom Webhooks", "Advanced Security"],
  },
];

export const seoPlans = [
  {
    name: "Basic SEO",
    price: "Ksh 15,000/month",
    features: ["Keyword Optimization", "On-Page SEO", "Basic Reporting"],
  },
  {
    name: "Advanced SEO",
    price: "Ksh 30,000/month",
    features: ["Technical SEO", "Content Optimization", "Backlink Strategy"],
    highlight: true, // ⭐ Premium Plan
  },
  {
    name: "Enterprise SEO",
    price: "Ksh 50,000+/month",
    features: ["Full-Site SEO Strategy", "Competitor Analysis", "ROI Tracking"],
  },
];

export const googleAdsPlans = [
  {
    name: "Starter Package",
    price: "Ksh 15,000/month",
    features: ["Campaign Setup", "Basic Keyword Research", "Monthly Reporting"],
  },
  {
    name: "Growth Package",
    price: "Ksh 30,000/month",
    features: [
      "Advanced Keyword Targeting",
      "Conversion Optimization",
      "Bi-Weekly Performance Reports",
    ],
    highlight: true, // ⭐ Popular Plan
  },
  {
    name: "Premium Package",
    price: "Custom Pricing",
    features: [
      "Full Campaign Management",
      "A/B Testing",
      "Dedicated Account Manager",
    ],
  },
];

export const emailMarketingPlans = [
  {
    name: "Starter Plan",
    price: "Ksh 10,000/month",
    features: [
      "Basic Email Campaigns",
      "Up to 1,000 Contacts",
      "Monthly Reports",
    ],
  },
  {
    name: "Growth Plan",
    price: "Ksh 20,000/month",
    features: [
      "Advanced Email Automation",
      "Up to 5,000 Contacts",
      "A/B Testing & Optimization",
    ],
    highlight: true, // ⭐ Popular Plan
  },
  {
    name: "Premium Plan",
    price: "Custom Pricing",
    features: [
      "Custom Email Strategy",
      "Unlimited Contacts",
      "Dedicated Email Manager",
    ],
  },
];
