import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services as allServices } from "../data/servicesData";
import { Link } from "react-router-dom";

const ServicesCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    if (isHovered) return;
    const interval = setInterval(() => scroll(300), 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const flatServices = allServices.flatMap((cat) =>
    cat.services.map((s) => ({
      ...s,
      category: cat.category,
    }))
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Services</h2>
            <p className="text-gray-600">
              Explore the full stack of what we offer.
            </p>
          </div>
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
          {flatServices.map((service, idx) => (
            <div
              key={idx}
              className="min-w-[260px] bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
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
              <div className="p-4 flex flex-col justify-between h-32">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.category}</p>
                </div>
                <Link
                  to={service.link}
                  className="text-blue-600 hover:underline text-sm mt-3"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
