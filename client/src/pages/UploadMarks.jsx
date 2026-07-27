import { useState, useEffect } from "react";
import api from "../api/axios";

function UploadMarks() {
  const [myDepartment, setMyDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    subject: "",
    examType: "internal1",
    marksObtained: "",
    maxMarks: "",
    semester: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const meRes = await api.get("/faculty/me");
        const dept = meRes.data.data.department;
        setMyDepartment(dept);

        const studentsRes = await api.get("/students", { params: { department: dept } });
        setStudents(studentsRes.data.data);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/academics/marks", form);
      setMessage("Marks uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload marks");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-blue-600 mb-2">Upload Marks</h1>
        {myDepartment && <p className="text-sm text-slate-500 mb-6">Showing students from: <span className="font-medium">{myDepartment}</span></p>}

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="student" value={form.student} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>{s.user?.name} ({s.rollNumber})</option>
            ))}
          </select>

          <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full border p-2 rounded" required />

          <select name="examType" value={form.examType} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="internal1">Internal 1</option>
            <option value="internal2">Internal 2</option>
            <option value="internal3">Internal 3</option>
            <option value="assignment">Assignment</option>
            <option value="semester">Semester</option>
          </select>

          <input name="marksObtained" type="number" placeholder="Marks Obtained" value={form.marksObtained} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="maxMarks" type="number" placeholder="Max Marks" value={form.maxMarks} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="semester" type="number" placeholder="Semester" value={form.semester} onChange={handleChange} className="w-full border p-2 rounded" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Upload Marks
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadMarks;