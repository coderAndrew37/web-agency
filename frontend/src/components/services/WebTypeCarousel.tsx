import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { websiteTypes } from "../../data/websitesData";
import { Link } from "react-router-dom";

export default function WebsiteTypeCarousel() {
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
    if (isHovered) return; // pause when hovered
    const interval = setInterval(() => scroll(300), 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Types of Websites We Build</h2>
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
          {websiteTypes.map((type) => (
            <div
              key={type.title}
              className="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col justify-between h-32">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-600">
                    Starting from {type.price}
                  </p>
                </div>
                <Link
                  to={`/websites/${type.title
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
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
}
