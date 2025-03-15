import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ Use our auth hook

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center mt-10">Checking authentication...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
