import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function MyAttendance() {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // First get this student's profile ID
        const studentsRes = await api.get("/students");
        const myProfile = studentsRes.data.data.find((s) => s.user?.email === user.email);

        if (!myProfile) {
          setError("Student profile not found");
          return;
        }

        const res = await api.get(`/attendance/student/${myProfile._id}`);
        setSummary(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attendance");
      }
    };
    fetchAttendance();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">My Attendance</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-3">
          {summary.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-medium">{s.subject}</p>
                <p className="text-sm text-slate-500">{s.attended} / {s.totalClasses} classes attended</p>
              </div>
              <div className={`text-xl font-bold ${s.percentage >= 75 ? "text-green-600" : "text-red-500"}`}>
                {s.percentage}%
              </div>
            </div>
          ))}
          {summary.length === 0 && !error && (
            <p className="text-slate-500">No attendance records yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAttendance;