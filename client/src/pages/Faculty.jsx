import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/faculty");
      setFaculty(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load faculty");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete faculty "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/faculty/${id}`);
      fetchFaculty();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete faculty");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Faculty</h1>
          <Link to="/faculty/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Faculty
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Employee ID</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f) => (
                <tr key={f._id} className="border-t">
                  <td className="p-3">{f.user?.name}</td>
                  <td className="p-3">{f.employeeId}</td>
                  <td className="p-3">{f.department}</td>
                  <td className="p-3">{f.designation}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate(`/faculty/edit/${f._id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f._id, f.user?.name)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {faculty.length === 0 && <p className="p-4 text-slate-500">No faculty found.</p>}
        </div>
      </div>
    </div>
  );
}

export default Faculty;