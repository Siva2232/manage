import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaTachometerAlt,
  FaUserMd,
  FaUserPlus,
  FaUsers,
  FaCalendarAlt,
  FaFileInvoice,
  FaChartBar,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "DoctorList", path: "/doctor", icon: <FaUserMd /> },
  { name: "Doctor Registration", path: "/doctor-registration", icon: <FaUserPlus /> },
  { name: "Patients", path: "/patients", icon: <FaUsers /> },
  { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
  { name: "Billing", path: "/billing", icon: <FaFileInvoice /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Analytics", path: "/analytics", icon: <FaChartLine /> },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) {
    return (
      <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-300">
        Please login.
      </div>
    );
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white dark:bg-gray-800 h-screen p-4 border-r dark:border-gray-700 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg`}
      aria-label="Sidebar"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              DentalCare
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <FaBars className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-pink-500 text-white dark:bg-pink-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : ""}`}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                <span className="text-lg">{link.icon}</span>
                {!isCollapsed && <span className="ml-3">{link.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`p-4 bg-pink-50 dark:bg-gray-700 rounded-lg shadow-inner ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {!isCollapsed && (
          <>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Welcome, <span className="font-bold">{user.name}</span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 capitalize">
              Role: {user.role}
            </p>
          </>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
          aria-label="Logout"
        >
          <FaSignOutAlt className={isCollapsed ? "" : "mr-2"} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}