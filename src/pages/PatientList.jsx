// /pages/PatientList.jsx
import React, { useEffect, useState } from "react";

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("patients");
    if (saved) setPatients(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patient List</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Diagnosis</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.gender}</td>
              <td className="p-2">{p.diagnosis}</td>
              <td className="p-2">
                <a
                  href={`/patient-details/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
