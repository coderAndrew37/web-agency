import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <Link
          to="/blog-posts"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog-posts" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(post.date).toDateString()}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{post.title}</h1>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-6 rounded-lg shadow"
          />
        )}
        <div
          className="mt-8 text-lg text-gray-800 space-y-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
};

export default BlogDetail;
