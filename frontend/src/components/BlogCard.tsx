import CardGrid from "./CardGrid";
import { Link } from "react-router-dom";

interface BlogPostCard {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  type?: string;
}

interface BlogCardGridProps {
  title?: string;
  subtitle?: string;
  posts: BlogPostCard[];
  variant?: "default" | "dark" | "soft";
  filterType?: string;
}

const BlogCardGrid = ({
  title = "Knowledge is Power! Learn something new today",
  subtitle,
  posts,
  variant = "soft",
  filterType,
}: BlogCardGridProps) => {
  const filteredPosts = filterType
    ? posts.filter((post) => post.type === filterType)
    : posts;

  const items = filteredPosts.map((post) => ({
    title: post.title,
    description: (
      <>
        <p className="mb-2">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-primary font-medium hover:underline"
          aria-label={`Read full blog: ${post.title}`}
        >
          Read more →
        </Link>
      </>
    ),
    icon: (
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-40 object-cover rounded-md"
      />
    ),
  }));

  return (
    <CardGrid
      title={title!}
      subtitle={subtitle}
      items={items}
      variant={variant}
    />
  );
};

export default BlogCardGrid;
