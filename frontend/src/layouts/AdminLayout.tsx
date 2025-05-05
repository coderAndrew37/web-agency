import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Main Admin Content */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
