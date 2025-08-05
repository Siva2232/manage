import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaUpload } from "react-icons/fa";

export default function DoctorRegistration() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    specialization: "",
    username: "",
    password: "",
    image: "", // Store base64 image
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("doctors");
    if (saved) {
      try {
        setDoctors(JSON.parse(saved));
      } catch (err) {
        setError("Failed to load doctor data.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file (e.g., PNG, JPG).");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
        setError(null);
      };
      reader.onerror = () => setError("Failed to read the image file.");
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.specialization || !formData.username || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (isEditing) {
      const updated = doctors.map((doc) => (doc.id === formData.id ? formData : doc));
      setDoctors(updated);
      setIsEditing(false);
    } else {
      setDoctors([...doctors, { ...formData, id: Date.now() }]);
    }

    setFormData({
      id: null,
      name: "",
      specialization: "",
      username: "",
      password: "",
      image: "",
    });
    e.target.reset(); // Reset file input
  };

  const handleEdit = (id) => {
    const doc = doctors.find((d) => d.id === id);
    setFormData(doc);
    setIsEditing(true);
    setError(null);
  };

  const handleDelete = (id) => {
    const filtered = doctors.filter((d) => d.id !== id);
    setDoctors(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Doctor Registration
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg flex items-center">
          <FaTrash className="mr-2" />
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter doctor name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              placeholder="Enter specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200"
              required
              aria-required="true"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-100 dark:file:bg-gray-700 file:text-gray-800 dark:file:text-gray-200 hover:file:bg-pink-200 dark:hover:file:bg-gray-600"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Profile preview"
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 dark:hover:bg-pink-800 transition-colors duration-200"
          aria-label={isEditing ? "Update Doctor" : "Register Doctor"}
        >
          <FaUserPlus className="mr-2" />
          {isEditing ? "Update Doctor" : "Register Doctor"}
        </button>
      </form>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Registered Doctors
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No doctors registered.
          </p>
        )}
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center mb-3">
              {doc.image ? (
                <img
                  src={doc.image}
                  alt={`${doc.name}'s profile`}
                  className="w-16 h-16 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                  <FaUserPlus className="text-gray-500 dark:text-gray-400 text-2xl" />
                </div>
              )}
              <div>
                <h4 className="text-lg font-bold text-pink-600 dark:text-pink-400">
                  {doc.name}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Specialization:</strong> {doc.specialization}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Username:</strong> {doc.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-3">
              (Use this username & password to login as doctor)
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(doc.id)}
                className="flex items-center px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors text-sm"
                aria-label={`Edit ${doc.name}`}
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="flex items-center px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-sm"
                aria-label={`Delete ${doc.name}`}
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}