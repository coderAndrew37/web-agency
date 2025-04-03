import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect } from "react";

const ProtectedRoute = ({
  adminOnly = false,
  redirectPath = "/",
  adminRedirectPath = "/dashboard",
}) => {
  const { user, loading, checkAuth } = useAuth();

  // ✅ Only check auth if accessing a protected route
  useEffect(() => {
    if (!user && !loading) {
      checkAuth();
    }
  }, [user, loading, checkAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to={adminRedirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
