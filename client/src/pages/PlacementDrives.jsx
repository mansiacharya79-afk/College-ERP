import { useState, useEffect } from "react";
import api from "../api/axios";

function PlacementDrives() {
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDrives = async () => {
    try {
      const res = await api.get("/placements/drives");
      setDrives(res.data.data);
    } catch (err) {
      setError("Failed to load drives");
    }
  };

  useEffect(() => {
    loadDrives();
  }, []);

  const handleRegister = async (driveId) => {
    setError("");
    setMessage("");
    try {
      await api.post(`/placements/drives/${driveId}/register`);
      setMessage("Registered successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Placement Drives</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <div className="space-y-4">
          {drives.map((d) => (
            <div key={d._id} className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{d.company?.name} — {d.role}</p>
                <p className="text-sm text-slate-500">{d.package} · Drive: {new Date(d.driveDate).toLocaleDateString()}</p>
                <p className="text-xs text-slate-400">Register by: {new Date(d.registrationDeadline).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleRegister(d._id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Register
              </button>
            </div>
          ))}
          {drives.length === 0 && <p className="text-slate-500">No placement drives available yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default PlacementDrives;