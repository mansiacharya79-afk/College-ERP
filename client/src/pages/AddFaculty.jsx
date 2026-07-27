import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddFaculty() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/faculty", form);
      setSuccess("Faculty added successfully!");
      setTimeout(() => navigate("/faculty"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add faculty");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Add Faculty</h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password (default: Faculty@123)" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="w-full border p-2 rounded" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Faculty
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFaculty;