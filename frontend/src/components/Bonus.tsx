// file: src/components/Bonus.tsx
import { Gift, Star, Rocket } from "lucide-react";
import CardGrid from "./CardGrid";

const defaultBonuses = [
  {
    title: "Exclusive Resources",
    description:
      "Get premium templates, guides, and tools to accelerate your success.",
    icon: <Gift size={36} className="text-yellow-400" />,
  },
  {
    title: "1-on-1 Strategy Session",
    description:
      "A personal consultation to tailor our services to your unique needs.",
    icon: <Star size={36} className="text-yellow-400" />,
  },
  {
    title: "Lifetime Updates",
    description:
      "Stay ahead with ongoing updates and improvements to your service.",
    icon: <Rocket size={36} className="text-yellow-400" />,
  },
];

interface BonusProps {
  title?: string;
  subtitle?: string;
  items?: typeof defaultBonuses;
}

const Bonus = ({
  title = "🔥 Bonuses Included!",
  subtitle,
  items = defaultBonuses,
}: BonusProps) => (
  <CardGrid title={title} subtitle={subtitle} items={items} variant="dark" />
);

export default Bonus;
