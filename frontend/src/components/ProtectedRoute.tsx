// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
// This component checks if the user is authenticated before allowing access to the protected routes.
// If the user is not authenticated, they are redirected to the login page. If the authentication status is still loading, a loading spinner is displayed.
