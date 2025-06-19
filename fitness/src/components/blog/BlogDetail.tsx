import React from "react";
import { ClockIcon } from "lucide-react";
import { type BlogPost } from "../../types/blog";

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-96 bg-gray-200 border-2 border-dashed w-full" />
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gray-200 border-2 border-dashed" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {post.author.name}
              </p>
              <div className="flex space-x-1 text-gray-500">
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
          <div className="flex items-center text-gray-500">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="prose max-w-none text-gray-600">{post.content}</div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            About the Author
          </h3>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gray-200 border-2 border-dashed" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-gray-600">Fitness Coach & Industry Expert</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
