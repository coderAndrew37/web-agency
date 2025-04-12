import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({
  adminOnly = false,
  redirectPath = "/",
  adminRedirectPath = "/dashboard",
}) => {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to={adminRedirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
