// /pages/FollowUpList.jsx
import React, { useEffect, useState } from "react";

export default function FollowUpList() {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("followUps");
    if (saved) setFollowUps(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Follow-Up List</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Patient</th>
            <th className="p-2">Note</th>
            <th className="p-2">Follow-Up Date</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.patientName}</td>
              <td className="p-2">{item.note}</td>
              <td className="p-2">{item.date}</td>
            </tr>
          ))}
          {followUps.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No follow-up entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
