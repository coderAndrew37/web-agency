"use client";

import { useState } from "react";
import { useTestimonials } from "../hooks/testimonials/useTestimonial";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 4;

const TestimonialSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
      <Skeleton key={i} className="h-48 rounded-xl" />
    ))}
  </div>
);

const TestimonialList = () => {
  const { testimonials, isLoading, isError } = useTestimonials();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <TestimonialSkeleton />;

  if (isError) {
    toast.error("Something went wrong while loading testimonials.");
    return (
      <div className="text-center text-red-500 mt-12">
        Unable to load testimonials. Please try again later.
      </div>
    );
  }

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const paginated = testimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {paginated.map((testimonial) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-md">
              <CardHeader className="flex items-center gap-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold">
                    {testimonial.name[0]}
                  </div>
                )}
                <CardTitle className="text-primary text-lg">
                  {testimonial.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base italic leading-relaxed">
                  "{testimonial.message}"
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TestimonialList;
