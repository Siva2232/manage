// /pages/PrescriptionPage.jsx
import React, { useEffect, useState } from "react";

export default function PrescriptionPage() {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("consultations");
    if (saved) setConsultations(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Patient</th>
            <th className="p-2">Diagnosis</th>
            <th className="p-2">Prescription</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.patientName}</td>
              <td className="p-2">{item.diagnosis}</td>
              <td className="p-2">{item.prescription}</td>
              <td className="p-2">{item.date}</td>
            </tr>
          ))}
          {consultations.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No prescriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
