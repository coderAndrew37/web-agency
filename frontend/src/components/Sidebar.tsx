import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Star,
  Mail,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useState, JSX } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 w-full text-left focus:outline-none"
      >
        {collapsed ? "▶" : "◀"}
      </button>

      <nav className="flex flex-col space-y-2 px-4">
        <NavItem
          to="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/users"
          icon={<Users size={20} />}
          label="Users"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/testimonials"
          icon={<Star size={20} />}
          label="Testimonials"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/subscribers"
          icon={<Mail size={20} />}
          label="Subscribers"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/contacts"
          icon={<MessageSquare size={20} />}
          label="Contact Messages"
          collapsed={collapsed}
        />
        <NavItem
          to="/admin/settings"
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>
    </div>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-3 rounded-lg hover:bg-gray-700 transition ${
        isActive ? "bg-primary text-black" : ""
      }`
    }
  >
    {icon}
    {!collapsed && <span className="ml-3">{label}</span>}
  </NavLink>
);

export default Sidebar;
