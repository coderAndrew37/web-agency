import { motion } from "framer-motion";
import { JSX } from "react";

interface StatsCardProps {
  icon: JSX.Element;
  title: string;
  value: number | string;
  color?: string;
}

const StatsCard = ({
  icon,
  title,
  value,
  color = "bg-blue-500",
}: StatsCardProps) => {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-md text-white ${color} flex items-center space-x-4`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
