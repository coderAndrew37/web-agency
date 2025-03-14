import colors from "../styles/colors";

const team = [
  { name: "John Doe", role: "Lead Developer", img: "/images/team1.jpg" },
  { name: "Jane Smith", role: "UI/UX Designer", img: "/images/team2.jpg" },
  { name: "Mike Johnson", role: "Project Manager", img: "/images/team3.jpg" },
];

const MeetTheTeam = () => {
  return (
    <section
      className="py-20 text-center"
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-4xl font-bold mb-6"
        style={{ color: colors.darkText }}
      >
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {team.map((member, i) => (
          <div
            key={i}
            className="p-6 rounded-lg shadow-md hover:scale-105 transition"
            style={{
              backgroundColor: "#fff",
              border: `1px solid ${colors.primary}`,
            }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3
              className="text-xl font-semibold"
              style={{ color: colors.darkText }}
            >
              {member.name}
            </h3>
            <p className="mt-2" style={{ color: colors.lightText }}>
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;
