import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { School } from "lucide-react";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-700">
      <div className="bg-secondary-50 p-8 rounded-2xl shadow-xl w-96">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-primary-700 rounded-lg p-2">
            <School size={20} className="text-secondary-200" />
          </div>
          <div>
            <p className="font-semibold text-primary-700 leading-tight">College ERP</p>
            <p className="text-[11px] text-primary-500">Placement platform</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-primary-700 mb-1">Create account</h1>
        <p className="text-sm text-primary-500 mb-6">Get started with your ERP profile</p>

        {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border border-primary-100 focus:border-primary-500 outline-none p-2.5 rounded-lg bg-white" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border border-primary-100 focus:border-primary-500 outline-none p-2.5 rounded-lg bg-white" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border border-primary-100 focus:border-primary-500 outline-none p-2.5 rounded-lg bg-white" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border border-primary-100 focus:border-primary-500 outline-none p-2.5 rounded-lg bg-white">
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="w-full bg-primary-700 text-white py-2.5 rounded-lg hover:bg-primary-600 transition-colors font-medium">
            Register
          </button>
        </form>

        <p className="text-sm mt-5 text-center text-primary-500">
          Already have an account? <Link to="/login" className="text-primary-700 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;