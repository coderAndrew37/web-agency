import colors from "../styles/colors";

const MissionVision = () => {
  return (
    <section
      className="py-20 text-center"
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-4xl font-bold mb-6"
        style={{ color: colors.darkText }}
      >
        Our Mission & Vision
      </h2>
      <p
        className="max-w-3xl mx-auto text-lg"
        style={{ color: colors.lightText }}
      >
        We create high-performance websites that drive business growth and
        lasting impact.
      </p>
      <div className="mt-6 flex flex-col md:flex-row justify-center gap-8">
        <div
          className="p-6 rounded-lg shadow-md"
          style={{
            backgroundColor: "#fff",
            border: `1px solid ${colors.primary}`,
          }}
        >
          <h3
            className="text-xl font-semibold"
            style={{ color: colors.primary }}
          >
            🚀 Our Mission
          </h3>
          <p className="mt-2" style={{ color: colors.lightText }}>
            Helping businesses scale with high-performance websites.
          </p>
        </div>
        <div
          className="p-6 rounded-lg shadow-md"
          style={{
            backgroundColor: "#fff",
            border: `1px solid ${colors.primary}`,
          }}
        >
          <h3
            className="text-xl font-semibold"
            style={{ color: colors.primary }}
          >
            🎯 Our Vision
          </h3>
          <p className="mt-2" style={{ color: colors.lightText }}>
            To be the go-to web agency for premium, results-driven sites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
