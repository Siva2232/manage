import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUsers,
  FaCalendarAlt,
  FaStethoscope,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
  FaSignOutAlt,
} from "react-icons/fa";

const cards = [
  { title: "Patient List", path: "/patient-list", icon: <FaUsers />, color: "blue" },
  { title: "Appointment Schedule", path: "/appointments", icon: <FaCalendarAlt />, color: "green" },
  { title: "Consultation Form", path: "/consultation", icon: <FaStethoscope />, color: "purple" },
  { title: "Prescription Page", path: "/prescription", icon: <FaPrescriptionBottleAlt />, color: "yellow" },
  { title: "Follow-up List", path: "/followups", icon: <FaNotesMedical />, color: "pink" },
];

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login-admin");
  };

  if (!user) {
    return (
      <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-300">
        Please login.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Auth Greeting */}
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome back, <span className="font-bold">{user?.name || "Doctor"}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            Role: {user?.role || "N/A"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Main Dashboard Content */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Doctor Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className={`flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-l-4 border-${card.color}-500 dark:border-${card.color}-400`}
            aria-label={`Navigate to ${card.title}`}
          >
            <span className={`text-2xl text-${card.color}-600 dark:text-${card.color}-400 mr-4`}>
              {card.icon}
            </span>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {card.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}