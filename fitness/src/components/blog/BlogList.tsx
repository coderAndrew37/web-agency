import React from "react";
import type BlogCard from "./BlogCard";
import { type BlogCard as BlogCardType } from "../../types/blog";

interface BlogListProps {
  posts: BlogCardType[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
