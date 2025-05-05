import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "./LoadingSpinner";

interface ConditionalRouteProps {
  required?: boolean;
  redirectPath?: string;
  adminOnly?: boolean;
  adminRedirectPath?: string;
}

const ConditionalRoute = ({
  required = false,
  redirectPath = "/login",
  adminOnly = false,
  adminRedirectPath = "/dashboard",
}: ConditionalRouteProps) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, hasCheckedAuth } = useAuthStore();

  // Wait for initial auth check to complete before evaluating route logic
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  // Only enforce auth if required
  if (required && !isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check admin privileges if needed
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to={adminRedirectPath} replace />;
  }

  return <Outlet />;
};

export default ConditionalRoute;
