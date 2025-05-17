// src/components/CardCarouselGrid.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CardItem {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

interface CardCarouselGridProps {
  title?: string;
  subtitle?: string;
  items: CardItem[];
}

export default function CardGrid({
  title,
  subtitle,
  items,
}: CardCarouselGridProps) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const listener = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    setIsSmall(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold mb-2 text-gray-700">{title}</h2>
        )}
        {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}

        <Carousel
          opts={{ align: "start" }}
          orientation={isSmall ? "vertical" : "horizontal"}
          className={cn(
            "transition-all duration-300",
            isSmall ? "max-w-xs mx-auto" : "w-full"
          )}
        >
          <CarouselContent
            className={cn(isSmall ? "-mt-1 h-[220px]" : "-ml-1")}
          >
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "p-1",
                  isSmall
                    ? "pt-1 basis-full"
                    : "basis-1/2 md:basis-1/3 lg:basis-1/4"
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full">
                    <CardContent className="flex flex-col justify-between h-full p-4 text-center">
                      <div className="mb-2">{item.icon}</div>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {!isSmall && (
            <div className="flex justify-end gap-4 items-center mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-2 sm:mt-4">
            {isSmall
              ? "Swipe up to explore more"
              : "Use arrows to explore more"}
          </p>
        </Carousel>
      </div>
    </section>
  );
}
