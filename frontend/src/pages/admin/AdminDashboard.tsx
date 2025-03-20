import { useEffect, useState } from "react";
import { useFetchAdminStats as fetchAdminStats } from "../../api/adminApi";
import StatsCard from "../../components/StatsCard";
import { motion } from "framer-motion";
import { Users, MessageSquare, Mail } from "lucide-react"; // ✅ Icons for stats

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    testimonials: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchAdminStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    loadStats();
  }, []);

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
          value={stats.users}
          color="bg-blue-500"
        />
        <StatsCard
          icon={<MessageSquare />}
          title="Testimonials"
          value={stats.testimonials}
          color="bg-green-500"
        />
        <StatsCard
          icon={<Mail />}
          title="Subscribers"
          value={stats.subscribers}
          color="bg-yellow-500"
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
