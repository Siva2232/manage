import React, { useState, useEffect } from "react";

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ patient: "", amount: "", status: "Pending" });

  useEffect(() => {
    const saved = localStorage.getItem("bills");
    if (saved) setBills(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.amount) return;
    setBills([...bills, form]);
    setForm({ patient: "", amount: "", status: "Pending" });
  };

  const handleDelete = (index) => {
    const updated = [...bills];
    updated.splice(index, 1);
    setBills(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Billing</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={form.patient}
          onChange={(e) => setForm({ ...form, patient: e.target.value })}
          className="p-2 border rounded w-full"
          placeholder="Patient"
        />
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="p-2 border rounded w-full"
          placeholder="Amount"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="p-2 border rounded w-full"
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
          Add Bill
        </button>
      </form>
      <ul className="space-y-2">
        {bills.map((bill, i) => (
          <li key={i} className="border p-2 rounded flex justify-between items-center">
            <span>
              {bill.patient} - ₹{bill.amount} ({bill.status})
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