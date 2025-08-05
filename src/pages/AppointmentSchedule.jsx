// /pages/AppointmentSchedule.jsx
import React, { useEffect, useState } from "react";

export default function AppointmentSchedule() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Scheduled Appointments</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Patient</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{a.patientName}</td>
              <td className="p-2">{a.doctor}</td>
              <td className="p-2">{a.date}</td>
              <td className="p-2">{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
