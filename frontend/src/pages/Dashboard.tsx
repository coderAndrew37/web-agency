import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { LogOut, UserCog, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Section */}
      <h2 className="text-3xl font-bold text-center text-primary">
        Welcome, {user?.name}! 🎉
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Your dashboard gives you full control over your account.
      </p>

      {/* User Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="p-5 bg-primary text-white rounded-lg flex flex-col items-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <ShieldCheck size={32} className="mb-2" />
          <p className="text-lg font-semibold">Role</p>
          <p className="text-sm">{user?.role.toUpperCase()}</p>
        </motion.div>

        <motion.div
          className="p-5 bg-gray-100 rounded-lg flex flex-col items-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <UserCog size={32} className="mb-2 text-primary" />
          <p className="text-lg font-semibold">Email</p>
          <p className="text-sm text-gray-700">{user?.email}</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
        <motion.button
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          Update Profile
        </motion.button>

        <motion.button
          className="w-full md:w-auto px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
          whileTap={{ scale: 0.95 }}
        >
          Change Password
        </motion.button>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={logout}
          className="px-6 py-3 flex items-center gap-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
