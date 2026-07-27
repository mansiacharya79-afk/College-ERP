import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function MyMarks() {
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const studentsRes = await api.get("/students");
        const myProfile = studentsRes.data.data.find((s) => s.user?.email === user.email);
        if (!myProfile) {
          setError("Student profile not found");
          return;
        }
        const res = await api.get("/academics/marks", { params: { student: myProfile._id } });
        setMarks(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load marks");
      }
    };
    fetchMarks();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">My Marks</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Exam Type</th>
                <th className="p-3">Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3">{m.subject}</td>
                  <td className="p-3">{m.examType}</td>
                  <td className="p-3">{m.marksObtained} / {m.maxMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {marks.length === 0 && !error && <p className="p-4 text-slate-500">No marks uploaded yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default MyMarks;