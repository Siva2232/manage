import React, { useState, useEffect } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: "", doctor: "", patient: "" });

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.doctor || !form.patient) return;
    setAppointments([...appointments, form]);
    setForm({ date: "", doctor: "", patient: "" });
  };

  const handleDelete = (index) => {
    const updated = [...appointments];
    updated.splice(index, 1);
    setAppointments(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Appointments</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded w-full"
          placeholder="Date"
        />
        <input
          type="text"
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
          className="p-2 border rounded w-full"
          placeholder="Doctor"
        />
        <input
          type="text"
          value={form.patient}
          onChange={(e) => setForm({ ...form, patient: e.target.value })}
          className="p-2 border rounded w-full"
          placeholder="Patient"
        />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
          Add Appointment
        </button>
      </form>
      <ul className="space-y-2">
        {appointments.map((appt, i) => (
          <li key={i} className="border p-2 rounded flex justify-between items-center">
            <span>
              {appt.date} - {appt.doctor} ({appt.patient})
            </span>
            <button
              onClick={() => handleDelete(i)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}