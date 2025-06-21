// import fashionStore from "../assets/fashion-store.jpeg";
// import beautyBrand from "../assets/beauty-brand.jpeg";
// import foodShop from "../assets/food-shop.jpeg";

export const caseStudies: CaseStudy[] = [
  {
    slug: "fashion-store-scaleup",
    title: "How a Fashion Store Boosted Sales by 300%",
    description:
      "See how Styles & Threads revamped their online store and increased conversions in just two months.",
    category: "Fashion",
    // imageUrl: fashionStore,
    content: `
      <p>
        Styles & Threads was facing declining online sales due to a clunky website and outdated branding.
      </p>
      <p>
        We redesigned their store with modern visuals, added an intuitive product filter, and integrated mobile payments.
      </p>
      <p>
        Sales grew 3X, bounce rate dropped by 40%, and their email list doubled.
      </p>
    `,
  },
  {
    slug: "beauty-brand-makeover",
    title: "Building a Loyal Customer Base for a Beauty Brand",
    description:
      "Discover how GlowMe used our ecommerce platform to grow their subscriber base and streamline orders.",
    category: "Beauty",
    // imageUrl: beautyBrand,
    content: `
      <p>
        GlowMe was a fast-growing skincare startup needing a polished online experience.
      </p>
      <p>
        We built a Shopify-powered store with subscription billing, upsell automations, and a customer dashboard.
      </p>
      <p>
        Within 90 days, revenue grew by 240%, and return customer rate reached 60%.
      </p>
    `,
  },
  {
    slug: "food-brand-delivery",
    title: "Scaling Local Orders for a Food Business",
    description:
      "Learn how TastyBites launched a full online store with delivery tracking and real-time inventory.",
    category: "Food",
    // imageUrl: foodShop,
    content: `
      <p>
        TastyBites needed more than a menu — they needed full ecommerce functionality.
      </p>
      <p>
        We implemented local delivery zones, instant order confirmations, and mobile ordering.
      </p>
      <p>
        They now handle 300+ orders weekly with no missed deliveries or stock issues.
      </p>
    `,
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  content: string;
};
