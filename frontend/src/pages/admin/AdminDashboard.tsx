import { motion } from "framer-motion";
import { Users, MessageSquare, Mail } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import { useAdminStats } from "../../hooks/admin/useAdmin";

const Dashboard = () => {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p>Error loading stats: {error.message}</p>;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<Users />}
          title="Total Users"
          value={stats?.users || 0}
          color="bg-blue-500"
        />
        <StatsCard
          icon={<MessageSquare />}
          title="Testimonials"
          value={stats?.testimonials || 0}
          color="bg-green-500"
        />
        <StatsCard
          icon={<Mail />}
          title="Subscribers"
          value={stats?.subscribers || 0}
          color="bg-yellow-500"
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
