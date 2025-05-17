import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@uidotdev/usehooks";
import { websiteTypes } from "../../data/websitesData";
import { Link } from "react-router-dom";

export default function WebsiteTypeCarousel() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Types of Websites We Build</h2>
        </div>

        <Carousel
          opts={{ align: "start" }}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          className={isSmallScreen ? "w-full max-w-xs" : "w-full"}
        >
          <CarouselContent
            className={isSmallScreen ? "-mt-1 h-[300px]" : "-ml-1"}
          >
            {websiteTypes.map((type) => (
              <CarouselItem
                key={type.title}
                className={
                  isSmallScreen
                    ? "pt-1 md:basis-1/2"
                    : "pl-1 md:basis-1/2 lg:basis-1/3"
                }
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="p-0">
                      <img
                        src={type.image}
                        alt={type.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                      <div className="p-4 flex flex-col justify-between h-32">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {type.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Starting from {type.price}
                          </p>
                        </div>
                        <Link
                          to={`/services/web-development/${type.slug}`}
                          className="text-blue-600 hover:underline text-sm mt-3"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
