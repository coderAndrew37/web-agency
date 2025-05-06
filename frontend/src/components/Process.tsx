import { ClipboardCheck, Layout, Rocket, ShieldCheck } from "lucide-react";
import colors from "../styles/colors";
import CardGrid from "./CardGrid";
import { JSX } from "react";

interface ProcessProps {
  title?: string;
  steps?: { title: string; description: string; icon: JSX.Element }[];
  subtitle?: string;
}

const defaultProcessSteps = [
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

const Process = ({
  title = "Our Process",
  steps = defaultProcessSteps,
}: ProcessProps) => <CardGrid title={title} items={steps} />;

export default Process;
