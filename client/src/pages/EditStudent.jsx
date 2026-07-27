import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    department: "", semester: "", batch: "", section: "", cgpa: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        const s = res.data.data;
        setForm({
          department: s.department || "",
          semester: s.semester || "",
          batch: s.batch || "",
          section: s.section || "",
          cgpa: s.cgpa || "",
        });
      } catch (err) {
        setError("Failed to load student");
      }
    };
    loadStudent();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.put(`/students/${id}`, form);
      setMessage("Student updated successfully!");
      setTimeout(() => navigate("/students"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Edit Student</h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="semester" type="number" placeholder="Semester" value={form.semester} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="batch" placeholder="Batch" value={form.batch} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="section" placeholder="Section" value={form.section} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="cgpa" type="number" step="0.01" placeholder="CGPA" value={form.cgpa} onChange={handleChange} className="w-full border p-2 rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;