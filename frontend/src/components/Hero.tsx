import colors from "../styles/colors";

const Hero = () => {
  return (
    <section
      className="hero relative flex flex-col items-center justify-center text-center h-screen px-6"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="relative z-10 max-w-4xl">
        <h1 className="hero-title text-5xl md:text-6xl font-extrabold leading-tight">
          Build a <span style={{ color: colors.primary }}>Premium Website</span>{" "}
          That Converts 🚀
        </h1>
        <p
          className="hero-subtext text-lg md:text-xl mt-4"
          style={{ color: colors.lightText }}
        >
          We design high-performance, conversion-focused websites that scale
          your business.
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
            Get Started
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
            Book a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
