// /pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUsers,
  FaCalendarAlt,
  FaRupeeSign,
  FaChartLine,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaDownload,
} from "react-icons/fa";

import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("monthly");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const storedPatients = localStorage.getItem("patients");
      const storedAppointments = localStorage.getItem("appointments");
      const storedBills = localStorage.getItem("bills");

      setPatients(storedPatients ? JSON.parse(storedPatients) : []);
      setAppointments(storedAppointments ? JSON.parse(storedAppointments) : []);
      setBills(storedBills ? JSON.parse(storedBills) : []);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const appointmentsToday = appointments.filter((a) => a?.date?.trim() === today);

  const totalRevenue = bills.reduce((sum, b) => {
    const amount = parseFloat(b?.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const billsByMonth = Array(12).fill(0);
  const billsByDay = Array(7).fill(0); // Sunday - Saturday

  bills.forEach((bill) => {
    const date = new Date(bill.date);
    const amount = parseFloat(bill.amount);
    if (!isNaN(amount)) {
      billsByMonth[date.getMonth()] += amount;
      billsByDay[date.getDay()] += amount;
    }
  });

  const monthlyRevenue = billsByMonth;
  const weeklyRevenue = billsByDay;

  const revenueData = {
    labels:
      viewMode === "monthly"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: viewMode === "monthly" ? "Monthly Revenue (₹)" : "Weekly Revenue (₹)",
        data: viewMode === "monthly" ? monthlyRevenue : weeklyRevenue,
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        borderColor: "rgba(236, 72, 153, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1F2937",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#1F2937",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#1F2937",
        },
      },
    },
  };

  const exportChart = async () => {
    const chartNode = document.getElementById("revenue-chart");
    if (!chartNode) return;

    const canvas = await html2canvas(chartNode);
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imageData, "PNG", 10, 10, 190, 100);
    pdf.save("revenue_chart.pdf");
  };

  if (!user) {
    return (
      <div className="text-center text-xl mt-10 text-gray-700 dark:text-gray-300">
        Please login.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <FaExclamationTriangle className="inline-block text-2xl mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome back, <span className="font-bold">{user.name || "User"}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            Role: {user.role || "N/A"}
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
        <button
          onClick={() => navigate("/analytics")}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800"
        >
          <FaChartLine className="mr-2" />
          View Analytics
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <FaUsers className="text-blue-600 text-2xl mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Total Patients
                </h2>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {patients.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-600 text-2xl mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Appointments Today
                </h2>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {appointmentsToday.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <FaRupeeSign className="text-purple-600 text-2xl mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Monthly Revenue
                </h2>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{totalRevenue.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        id="revenue-chart"
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Revenue Trend
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "weekly"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "monthly"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={exportChart}
              className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
            >
              <FaDownload className="mr-1" />
              Export
            </button>
          </div>
        </div>
        <Line data={revenueData} options={chartOptions} />
      </div>
    </div>
  );
}
