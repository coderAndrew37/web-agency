import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <span>Welcome, {user?.name}</span>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
