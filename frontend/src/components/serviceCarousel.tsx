import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { services as allServices } from "../data/servicesData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ServicesCarousel = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const listener = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    setIsSmall(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const flatServices = allServices.flatMap((cat) =>
    cat.services.map((s) => ({ ...s, category: cat.category }))
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600">
            Explore the full stack of what we offer.
          </p>
        </div>

        <Carousel className="w-full">
          <div className="flex justify-end gap-2 mb-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>

          <CarouselContent className="-ml-1">
            {flatServices.map((service, idx) => (
              <CarouselItem
                key={idx}
                className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                    ) : (
                      <div className="flex justify-center items-center h-40 rounded-t-xl bg-gray-50">
                        {service.icon}
                      </div>
                    )}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {service.category}
                        </p>
                      </div>
                      <Link
                        to={service.link}
                        className="text-blue-600 hover:underline text-sm mt-3"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isSmall
              ? "Swipe left or use arrows above to explore services"
              : "Use arrows above to explore services"}
          </p>
        </Carousel>
      </div>
    </section>
  );
};

export default ServicesCarousel;
