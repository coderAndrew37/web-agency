import React from "react";
import PageHero from "../components/PageHero";
import BlogList from "../components/blog/BlogList";
import { blogPosts } from "../data/blogPosts";
import Boghero from "../assets/blog-hero.jpeg";

const BlogListPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero
        title="Eccomerce Business Insights"
        subtitle="Blog"
        description="Discover the latest tips, strategies, and industry insights to grow your Eccomerce business."
        primaryButton={{ text: "Get Started", link: "/contact" }}
        secondaryButton={{ text: "Learn More", link: "/about" }}
        image={Boghero}
      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Expert advice to help you attract more clients and grow your
            Ecommerce Business
          </p>
        </div>

        <BlogList posts={blogPosts} />

        <div className="mt-16 flex justify-center">
          <button className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
