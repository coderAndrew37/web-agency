import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import colors from "../styles/colors";

const AuthLayout = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-gray-100"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
