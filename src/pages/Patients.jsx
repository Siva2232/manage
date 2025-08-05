import React, { useState, useEffect } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    doctorId: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load doctors from localStorage only (no mock data)
  useEffect(() => {
    const stored = localStorage.getItem("doctors");
    if (stored) {
      setDoctors(JSON.parse(stored));
    } else {
      setDoctors([]); // fallback if no doctor data
    }
  }, []);

  // Load patients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("patients");
    if (saved) {
      setPatients(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when patients state changes
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);
    setFormData({ ...formData, doctorId });
  };

  // Handle add/update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.doctorId) {
      alert("Please select a doctor");
      return;
    }

    if (isEditing) {
      const updated = patients.map((p) =>
        p.id === formData.id ? formData : p
      );
      setPatients(updated);
      setIsEditing(false);
    } else {
      setPatients([
        ...patients,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({
      id: null,
      name: "",
      age: "",
      gender: "",
      diagnosis: "",
      doctorId: selectedDoctorId,
    });
  };

  const handleEdit = (id) => {
    const patient = patients.find((p) => p.id === id);
    setFormData(patient);
    setIsEditing(true);
    setSelectedDoctorId(patient.doctorId);
  };

  const handleDelete = (id) => {
    const filtered = patients.filter((p) => p.id !== id);
    setPatients(filtered);
  };

  // Filter patients based on selected doctor
  const filteredPatients = patients.filter(
    (p) => p.doctorId === selectedDoctorId
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patient Management</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Select Doctor:</label>
        <select
          value={selectedDoctorId}
          onChange={handleDoctorChange}
          className="p-2 border rounded"
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-2 border rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Diagnosis"
            className="p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Patient List</h3>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Diagnosis</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.gender}</td>
              <td className="p-2">{patient.diagnosis}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(patient.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No patients for this doctor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
