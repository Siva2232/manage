import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        login("admin", { name: "Admin" });
        navigate("/dashboard");
      } else {
        setError("Invalid admin credentials.");
      }
    } else if (role === "doctor") {
      const stored = localStorage.getItem("doctors");
      if (stored) {
        const doctors = JSON.parse(stored);
        const foundDoctor = doctors.find(
          (doc) => doc.username === username && doc.password === password
        );
        if (foundDoctor) {
          login("doctor", { name: foundDoctor.name, id: foundDoctor.id });
          navigate("/dashboard");
          return;
        }
      }
      setError("Invalid doctor credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">Login</h2>

        <select
          className="p-2 w-full border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
        </select>

        <input
          type="text"
          placeholder="Username"
          className="p-2 w-full border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 w-full border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>
    </div>
  );
}
