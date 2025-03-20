import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // ✅ If user is not logged in, send them to home instead of login
  if (!user) return <Navigate to="/" replace />;

  // ✅ If admin-only but user is not an admin, redirect to dashboard
  if (adminOnly && user.role !== "admin")
    return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
