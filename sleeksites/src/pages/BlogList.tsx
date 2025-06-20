import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogListPage = () => {
  return (
    <main className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Insights & Articles
        </h1>
        <p className="text-gray-600 text-lg text-center mb-12">
          Marketing tips, website strategy & ecommerce insights from the
          SleekSites team.
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogs.map((post) => (
            <SwiperSlide key={post.slug}>
              <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.date
                      ? new Date(post.date).toDateString()
                      : "Date Unknown"}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{post.summary}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default BlogListPage;
