import { type BlogPost } from "../types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips for Growing Your Fitness Coaching Business",
    slug: "10-tips-for-growing-your-fitness-coaching-business",
    excerpt:
      "Discover proven strategies to attract more clients and scale your fitness coaching business online.",
    content: `
      <p>Growing a fitness coaching business requires more than just expertise in training. In today's digital age, you need a solid online presence and effective marketing strategies. Here are 10 proven tips to help you scale your business:</p>
      
      <h3>1. Create a Professional Website</h3>
      <p>Your website is your digital storefront. Make sure it's professional, mobile-friendly, and clearly communicates your unique value proposition.</p>
      
      <h3>2. Leverage Social Media</h3>
      <p>Share valuable content, client success stories, and behind-the-scenes glimpses of your coaching process.</p>
      
      <!-- More content -->
    `,
    date: "2023-05-15",
    author: {
      name: "Alex Johnson",
      avatar: "/images/avatars/alex-johnson.jpg",
    },
    image: "/images/blog/growth-tips.jpg",
    tags: ["Business", "Marketing", "Growth"],
    readTime: 8,
  },
  {
    id: "2",
    title: "How to Create Engaging Online Workouts",
    slug: "how-to-create-engaging-online-workouts",
    excerpt:
      "Learn the secrets to designing online workouts that keep your clients motivated and coming back for more.",
    content: `
      <p>Online training requires a different approach than in-person sessions. Here's how to create workouts that engage clients virtually:</p>
      
      <h3>Focus on Interaction</h3>
      <p>Ask questions, use your clients' names, and create opportunities for feedback during the session.</p>
      
      <h3>Use Multiple Camera Angles</h3>
      <p>Show exercises from different perspectives to ensure proper form understanding.</p>
      
      <!-- More content -->
    `,
    date: "2023-04-22",
    author: {
      name: "Sarah Miller",
      avatar: "/images/avatars/sarah-miller.jpg",
    },
    image: "/images/blog/online-workouts.jpg",
    tags: ["Training", "Online", "Engagement"],
    readTime: 6,
  },
  {
    id: "3",
    title: "The Ultimate Guide to Client Retention",
    slug: "ultimate-guide-to-client-retention",
    excerpt:
      "Keep your clients coming back with these proven retention strategies for fitness coaches.",
    content: `
      <p>Client retention is crucial for a sustainable fitness business. Here's how to keep clients engaged long-term:</p>
      
      <h3>Personalize the Experience</h3>
      <p>Tailor workouts and communication to each client's specific goals and preferences.</p>
      
      <h3>Set Clear Milestones</h3>
      <p>Help clients track progress with measurable goals and celebrate achievements.</p>
      
      <!-- More content -->
    `,
    date: "2023-03-10",
    author: {
      name: "Mike Thompson",
      avatar: "/images/avatars/mike-thompson.jpg",
    },
    image: "/images/blog/client-retention.jpg",
    tags: ["Clients", "Retention", "Business"],
    readTime: 10,
  },
  {
    id: "4",
    title: "SEO Strategies for Fitness Coaches",
    slug: "seo-strategies-for-fitness-coaches",
    excerpt:
      "Improve your online visibility and attract more clients through search engine optimization.",
    content: `
      <p>SEO can be a powerful client acquisition channel for fitness professionals. Implement these strategies:</p>
      
      <h3>Keyword Research</h3>
      <p>Identify what potential clients are searching for in your area.</p>
      
      <h3>Local SEO</h3>
      <p>Optimize your website and listings for local searches.</p>
      
      <!-- More content -->
    `,
    date: "2023-02-18",
    author: {
      name: "Jessica Williams",
      avatar: "/images/avatars/jessica-williams.jpg",
    },
    image: "/images/blog/seo-strategies.jpg",
    tags: ["Marketing", "SEO", "Online"],
    readTime: 9,
  },
  // Add more posts as needed
];
