import { useParams } from "react-router-dom";
import BlogLayout from "../layouts/BlogLayout";
import { blogPosts } from "../data/blogPosts";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-10 text-center">Blog post not found.</div>;
  }

  return <BlogLayout {...post} />;
};

export default BlogDetailPage;
