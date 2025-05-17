// src/components/BlogCarousel.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import BlogSkeletonCard from "./BlogSkeletonCard";

const BlogCarousel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-500 md:leading-snug lg:leading-relaxed xl:leading-loose">
            Knowledge is power. Learn something new today
          </h2>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <CarouselItem
                    key={idx}
                    className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <BlogSkeletonCard />
                  </CarouselItem>
                ))
              : blogPosts.map((post) => (
                  <CarouselItem
                    key={post.slug}
                    className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full flex flex-col">
                      <CardContent className="p-0 flex flex-col h-full">
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
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
          </CarouselContent>

          <div className="hidden sm:flex justify-end gap-4 items-center mt-4">
            <CarouselPrevious>
              <div className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </div>
            </CarouselPrevious>
            <CarouselNext>
              <div className="flex items-center gap-1">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </CarouselNext>
          </div>

          <p className="text-center text-sm text-gray-500 mt-2 sm:mt-4">
            Swipe left or use the arrows to view more blog posts.
          </p>
        </Carousel>
      </div>
    </section>
  );
};

export default BlogCarousel;
