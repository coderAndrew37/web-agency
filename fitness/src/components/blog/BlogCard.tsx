import React from "react";
import { Link } from "react-router-dom";
import { type BlogCard } from "../../types/blog";
import { ClockIcon } from "lucide-react";

interface BlogCardProps {
  post: BlogCard;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${post.slug}`}>
        <div className="h-48 bg-gray-200 border-2 border-dashed rounded-t-lg w-full" />
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-dashed" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
