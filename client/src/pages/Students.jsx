import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Students</h1>
          <Link to="/students/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Student
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Roll No</th>
                <th className="p-3">Department</th>
                <th className="p-3">Semester</th>
                <th className="p-3">CGPA</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.user?.name}</td>
                  <td className="p-3">{s.rollNumber}</td>
                  <td className="p-3">{s.department}</td>
                  <td className="p-3">{s.semester}</td>
                  <td className="p-3">{s.cgpa}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate(`/students/edit/${s._id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id, s.user?.name)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <p className="p-4 text-slate-500">No students found.</p>}
        </div>
      </div>
    </div>
  );
}

export default Students;