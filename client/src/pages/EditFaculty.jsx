import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ department: "", designation: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const res = await api.get(`/faculty/${id}`);
        const f = res.data.data;
        setForm({ department: f.department || "", designation: f.designation || "" });
      } catch (err) {
        setError("Failed to load faculty");
      }
    };
    loadFaculty();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.put(`/faculty/${id}`, form);
      setMessage("Faculty updated successfully!");
      setTimeout(() => navigate("/faculty"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update faculty");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Edit Faculty</h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="w-full border p-2 rounded" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Faculty
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFaculty;