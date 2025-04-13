import { useCurrentUser, useLogout } from "../hooks/useAuth";
import { useMyProjects } from "../hooks/projects/useProjectsHooks";
import { motion } from "framer-motion";
import { LogOut, UserCog, ShieldCheck, Home, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { default as Spinner } from "../components/LoadingSpinner"; // Assuming you have a Spinner component

const Dashboard = () => {
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();
  const isAdmin = user?.role === "admin";

  // Fetch user's projects
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useMyProjects();

  const hasProjects = projectsData?.data && projectsData.data.length > 0;

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <motion.div
      className="container mx-auto mt-28 p-8 bg-white shadow-xl rounded-lg border border-gray-200 max-w-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-primary">
        Welcome, {user?.name}! 🎉
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Your dashboard gives you full control over your account.
      </p>

      {/* Projects Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Folder className="text-primary" size={20} />
          Your Projects
        </h3>

        {/* Loading State */}
        {projectsLoading && (
          <div className="flex justify-center py-8">
            <Spinner size={32} />
          </div>
        )}

        {/* Error State */}
        {projectsError && (
          <motion.div
            className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Error loading projects: {projectsError.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-700 underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!projectsLoading && !projectsError && !hasProjects && (
          <motion.div
            className="text-center py-8 border border-dashed rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Folder size={32} className="mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">
              You don't have any projects yet
            </p>
          </motion.div>
        )}

        {/* Projects List */}
        {!projectsLoading && !projectsError && hasProjects && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {projectsData.data.map((project) => (
              <motion.div
                key={project._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span className="capitalize">{project.status}</span>
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Stats Grid */}
      <div
        className={`mt-6 grid gap-6 ${
          isAdmin ? "md:grid-cols-2" : "md:grid-cols-1"
        }`}
      >
        {isAdmin && (
          <motion.div
            className="p-5 bg-primary text-black rounded-lg flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <ShieldCheck size={32} className="mb-2" />
            <p className="text-lg font-semibold">Role</p>
            <p className="text-sm">{user?.role.toUpperCase()}</p>
          </motion.div>
        )}

        <motion.div
          className="p-5 bg-gray-100 rounded-lg flex flex-col items-center shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <UserCog size={32} className="mb-2 text-primary" />
          <p className="text-lg font-semibold">Email</p>
          <p className="text-sm text-gray-700">{user?.email}</p>
        </motion.div>
      </div>

      {/* Action Buttons */}
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

      {/* Navigation Links */}
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-primary hover:underline transition"
        >
          <Home size={20} />
          Back to Homepage
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={handleLogout}
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
