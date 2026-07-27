import { useState, useEffect } from "react";
import api from "../api/axios";

function MarkAttendance() {
  const [myDepartment, setMyDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  const [statusMap, setStatusMap] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyDept = async () => {
      try {
        const res = await api.get("/faculty/me");
        setMyDepartment(res.data.data.department);
      } catch (err) {
        setError("Failed to load your faculty profile");
      }
    };
    fetchMyDept();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/students", { params: { department: myDepartment, semester, section } });
      setStudents(res.data.data);
      const initial = {};
      res.data.data.forEach((s) => (initial[s._id] = "present"));
      setStatusMap(initial);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    }
  };

  const toggleStatus = (studentId) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const records = students.map((s) => ({ student: s._id, status: statusMap[s._id] }));
      await api.post("/attendance", { subject, department: myDepartment, semester, section, date, records });
      setMessage("Attendance marked successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark attendance");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Mark Attendance</h1>
        {myDepartment && <p className="text-sm text-slate-500 mb-6">Department: <span className="font-medium">{myDepartment}</span> (locked to your department)</p>}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="border p-2 rounded" />
            <input placeholder="Semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2 rounded" />
            <input placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} className="border p-2 rounded" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />
          </div>
          <button onClick={loadStudents} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800">
            Load Students
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        {students.length > 0 && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {students.map((s) => (
              <div key={s._id} className="flex justify-between items-center border-b py-2">
                <span>{s.user?.name} ({s.rollNumber})</span>
                <button
                  type="button"
                  onClick={() => toggleStatus(s._id)}
                  className={`px-3 py-1 rounded text-sm ${
                    statusMap[s._id] === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {statusMap[s._id]}
                </button>
              </div>
            ))}
            <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Submit Attendance
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MarkAttendance;