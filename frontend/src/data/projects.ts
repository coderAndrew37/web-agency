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
    imageUrl: "/images/projects/ecommerce.jpg",
    liveUrl: "https://example.com/ecommerce",
  },
  {
    title: "Corporate Website",
    description: "A professional website for a leading consultancy firm.",
    imageUrl: "/images/projects/corporate.jpg",
  },
  {
    title: "Startup Landing Page",
    description: "High-converting landing page for a startup launch.",
    imageUrl: "/images/projects/startup.jpg",
    liveUrl: "https://example.com/startup",
  },
];

export const appProjects: Project[] = [
  {
    title: "E-Commerce Mobile App",
    description: "A seamless shopping experience with real-time updates.",
    imageUrl: "/images/projects/ecommerce-app.jpeg",
  },
  {
    title: "Fitness Tracking App",
    description: "Track workouts and health stats in real-time.",
    imageUrl: "/images/projects/fitness-app.jpeg",
  },
  {
    title: "Food Delivery App",
    description: "Order food from top restaurants with real-time tracking.",
    imageUrl: "/images/projects/food-app.jpeg",
  },
];
