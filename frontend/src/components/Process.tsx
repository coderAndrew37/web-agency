import { ClipboardCheck, Layout, Rocket, ShieldCheck } from "lucide-react";
import colors from "../styles/colors";

const steps = [
  {
    title: "Consultation",
    description: "We discuss your vision and goals.",
    icon: <ClipboardCheck size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Design & Development",
    description: "We craft a visually stunning and functional site.",
    icon: <Layout size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Testing & Launch",
    description: "We ensure everything runs smoothly before going live.",
    icon: <Rocket size={36} style={{ color: colors.primary }} />,
  },
  {
    title: "Security & Maintenance",
    description: "Ongoing support to keep your site running perfectly.",
    icon: <ShieldCheck size={36} style={{ color: colors.primary }} />,
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="py-20 text-center"
      style={{ backgroundColor: colors.background, color: colors.darkText }}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
