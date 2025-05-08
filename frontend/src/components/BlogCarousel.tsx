import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import BlogSkeletonCard from "./BlogSkeletonCard";

const BlogCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const scroll = (offset: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScrollLeft = container.scrollLeft + offset;

    container.scrollTo({
      left: newScrollLeft >= maxScroll ? 0 : newScrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => scroll(300), 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-500 md:leading-snug lg:leading-relaxed xl:leading-loose">
            Knowledge is power. Learn something new today
          </h2>
          a
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-300)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(300)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto space-x-4 no-scrollbar"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <BlogSkeletonCard key={idx} />
              ))
            : blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="min-w-[280px] flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline text-sm font-semibold mt-3"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
