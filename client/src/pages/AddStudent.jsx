import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    department: "",
    semester: "",
    batch: "",
    section: "",
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
      await api.post("/students", form);
      setSuccess("Student added successfully!");
      setTimeout(() => navigate("/students"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Add Student</h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password (default: Student@123)" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="semester" type="number" placeholder="Semester" value={form.semester} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="batch" placeholder="Batch (e.g. 2023-2027)" value={form.batch} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="section" placeholder="Section" value={form.section} onChange={handleChange} className="w-full border p-2 rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;