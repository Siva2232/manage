// /pages/ConsultationForm.jsx
import React, { useState } from "react";

export default function ConsultationForm() {
  const [form, setForm] = useState({
    patientName: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("consultations")) || [];
    saved.push({ ...form, date: new Date().toLocaleDateString() });
    localStorage.setItem("consultations", JSON.stringify(saved));
    alert("Consultation saved.");
    setForm({ patientName: "", diagnosis: "", prescription: "", notes: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Consultation Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="prescription"
          value={form.prescription}
          onChange={handleChange}
          placeholder="Prescription"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Consultation
        </button>
      </form>
    </div>
  );
}
