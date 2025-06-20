import React from "react";
import { blogPosts } from "../../data/blogPosts";
import BlogCard from "./BlogCard";

interface RecentPostsProps {
  currentPostId: string;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ currentPostId }) => {
  // Filter out the current post and get the 3 most recent
  const recentPosts = blogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {recentPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default RecentPosts;
