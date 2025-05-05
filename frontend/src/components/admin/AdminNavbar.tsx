// AdminNavbar.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center space-x-8"
      >
        <h1 className="text-lg font-bold">Admin Dashboard</h1>

        {/* Admin Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/admin">Overview</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>
      </motion.div>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline">Welcome, {user?.name}</span>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <a href={to} className="hover:text-gray-300 transition-colors">
      {children}
    </a>
  </motion.div>
);

export default AdminNavbar;
