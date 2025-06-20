import { type BlogPost } from "../types/blog";

export const blogs: BlogPost[] = [
  {
    slug: "why-your-website-isnt-converting",
    title: "5 Reasons Your Website Isn’t Converting Visitors",
    summary:
      "We break down the most common website mistakes that cost you sales.",
    content: `
      <p>Most business websites look great, but don’t convert. In this post, we cover 5 big mistakes coaches and shop owners make that turn visitors away instead of converting them.</p>
      <p>From slow load times to unclear calls-to-action, we show you how to fix them all.</p>
    `,
    date: "2024-11-05",
    coverImage: "/images/blog-cover-1.jpg",
  },
  {
    slug: "how-to-launch-online-store-fast",
    title: "How to Launch Your Online Store in 7 Days",
    summary:
      "Step-by-step playbook for getting your ecommerce store up and running in a week.",
    content: `
      <p>Feeling stuck launching your online store? We’ve helped dozens of Kenyan businesses go from product idea to live ecommerce site in just 7 days.</p>
      <p>This post outlines everything you need to know to go live — fast.</p>
    `,
    date: "2025-02-10",
    coverImage: "/images/blog-cover-2.jpg",
  },
];
