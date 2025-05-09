interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  features?: string[];
}

export const webProjects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A scalable online store with integrated payment solutions.",
    imageUrl: "/images/ecommerce.jpg",
    liveUrl: "https://example.com/ecommerce",
  },
  {
    title: "Corporate Website",
    description: "A professional website for a leading consultancy firm.",
    imageUrl: "/images/corporate.jpg",
  },
  {
    title: "Startup Landing Page",
    description: "High-converting landing page for a startup launch.",
    imageUrl: "/images/startup.jpg",
    liveUrl: "https://example.com/startup",
  },
];

export const appProjects: Project[] = [
  {
    title: "E-Commerce Mobile App",
    description: "A seamless shopping experience with real-time updates.",
    imageUrl: "/images/ecommerce-app.jpg",
  },
  {
    title: "Fitness Tracking App",
    description: "Track workouts and health stats in real-time.",
    imageUrl: "/images/fitness-app.jpg",
  },
  {
    title: "Food Delivery App",
    description: "Order food from top restaurants with real-time tracking.",
    imageUrl: "/images/food-app.jpg",
  },
];
