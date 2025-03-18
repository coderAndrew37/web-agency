import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colors from "../styles/colors";

gsap.registerPlugin(ScrollTrigger);

const HeroWebDevelopment = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center text-center h-screen px-6"
      style={{
        backgroundImage: `url('/images/web-dev-hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: colors.darkText,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Custom <span style={{ color: colors.primary }}>Web Development</span>{" "}
          for Your Business Success 🚀
        </h1>
        <p
          className="text-lg md:text-xl mt-4"
          style={{ color: colors.lightText }}
        >
          Build a fast, secure, and high-converting website that works for you.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <button
            className="px-6 py-3 font-bold text-lg rounded-full shadow-md hover:opacity-80 transition"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Book a Free Consultation
          </button>
          <button
            className="px-6 py-3 border-2 font-bold text-lg rounded-full hover:opacity-80 transition"
            style={{
              borderColor: colors.primary,
              color: colors.darkText,
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroWebDevelopment;
