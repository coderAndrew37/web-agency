interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Chen",
    role: "Online Store Owner",
    content:
      "Since launching my online store, I've seen a 50% increase in sales. The team's expertise in e-commerce solutions has been invaluable.",
    avatar: null,
  },
  {
    id: 2,
    name: "David Lee",
    role: "E-commerce Manager",
    content:
      "The team's knowledge of e-commerce platforms and solutions has helped us streamline our operations and increase conversions.",
    avatar: null,
  },
  {
    id: 3,
    name: "Sophia Patel",
    role: "Online Business Owner",
    content:
      "I was impressed by the team's attention to detail and ability to understand my business needs. My online store has never looked better.",
    avatar: null,
  },
  {
    id: 4,
    name: "John Kim",
    role: "E-commerce Specialist",
    content:
      "The team's expertise in e-commerce solutions has helped us increase our online sales by 20%. I highly recommend them.",
  },
  {
    id: 5,
    name: "Olivia Taylor",
    role: "Online Store Manager",
    content:
      "The team's knowledge of e-commerce platforms and solutions has been instrumental in helping us scale our online business.",
    avatar: null,
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "E-commerce Consultant",
    content:
      "I've worked with several e-commerce solution providers, but this team stands out for their expertise and dedication to delivering high-quality results.",
    avatar: null,
  },
  {
    id: 7,
    name: "Rachel Lee",
    role: "Online Business Owner",
    content:
      "The team's attention to detail and ability to understand my business needs has helped me increase my online sales by 15%. I highly recommend them.",
    avatar: null,
  },
];
