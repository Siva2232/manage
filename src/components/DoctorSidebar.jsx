import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaStethoscope,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Patient List", path: "/patient-list", icon: <FaUsers /> },
  { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
  { name: "Consultation", path: "/consultation", icon: <FaStethoscope /> },
  { name: "Prescriptions", path: "/prescription", icon: <FaPrescriptionBottleAlt /> },
  { name: "Follow Ups", path: "/followups", icon: <FaNotesMedical /> },
];

export default function DoctorSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login-admin");
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (!user) {
    return (
      <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-300">
        Please login.
      </div>
    );
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen bg-pink-50 dark:bg-gray-800 p-4 flex flex-col justify-between shadow-lg transition-all duration-300 ease-in-out border-r dark:border-gray-700`}
      aria-label="Doctor Sidebar"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400">
              Doctor Panel
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <FaBars className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-pink-500 text-white dark:bg-pink-600"
                    : "text-gray-800 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : ""}`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              <span className="text-lg">{link.icon}</span>
              {!isCollapsed && <span className="ml-3">{link.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={`mt-8 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-inner ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {!isCollapsed && (
          <>
            <div className="flex items-center mb-2">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.name || "Doctor"}'s profile`}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
              ) : (
                <FaUserCircle className="text-xl text-gray-600 dark:text-gray-300 mr-2" />
              )}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Welcome, <span className="font-bold">{user?.name || "Doctor"}</span>
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 capitalize">
              Role: {user?.role || "N/A"}
            </p>
          </>
        )}
        <button
          onClick={handleLogout}
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