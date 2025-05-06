import { ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import CardGrid from "./CardGrid";

const defaultGuarantees = [
  {
    title: "100% Satisfaction Guarantee",
    description:
      "We stand by our services with a full money-back guarantee if you're not satisfied.",
    icon: <ShieldCheck size={36} className="text-primary" />,
  },
  {
    title: "On-Time Delivery",
    description:
      "We value your time and promise to meet every deadline we set together.",
    icon: <Clock size={36} className="text-primary" />,
  },
  {
    title: "Top Quality Assurance",
    description:
      "Every project undergoes strict quality checks to ensure excellence.",
    icon: <ThumbsUp size={36} className="text-primary" />,
  },
];

interface GuaranteesProps {
  title?: string;
  subtitle?: string;
  items?: typeof defaultGuarantees;
}

const Guarantees = ({
  title = "Our Guarantees",
  subtitle,
  items = defaultGuarantees,
}: GuaranteesProps) => (
  <CardGrid title={title} subtitle={subtitle} items={items} />
);

export default Guarantees;
