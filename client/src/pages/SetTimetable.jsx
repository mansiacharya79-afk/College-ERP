import { useState } from "react";
import api from "../api/axios";

function SetTimetable() {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [periods, setPeriods] = useState([
    { day: "Monday", startTime: "", endTime: "", subject: "", room: "" },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updatePeriod = (index, field, value) => {
    const updated = [...periods];
    updated[index][field] = value;
    setPeriods(updated);
  };

  const addPeriod = () => {
    setPeriods([...periods, { day: "Monday", startTime: "", endTime: "", subject: "", room: "" }]);
  };

  const removePeriod = (index) => {
    setPeriods(periods.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/academics/timetable", { department, semester, section, periods });
      setMessage("Timetable saved successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save timetable");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Set Timetable</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2 rounded" required />
            <input placeholder="Semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2 rounded" required />
            <input placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} className="border p-2 rounded" />
          </div>

          <h2 className="font-semibold text-slate-700">Periods</h2>
          {periods.map((p, i) => (
            <div key={i} className="grid grid-cols-6 gap-2 items-center">
              <select value={p.day} onChange={(e) => updatePeriod(i, "day", e.target.value)} className="border p-2 rounded text-sm">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input placeholder="Start (09:00)" value={p.startTime} onChange={(e) => updatePeriod(i, "startTime", e.target.value)} className="border p-2 rounded text-sm" />
              <input placeholder="End (10:00)" value={p.endTime} onChange={(e) => updatePeriod(i, "endTime", e.target.value)} className="border p-2 rounded text-sm" />
              <input placeholder="Subject" value={p.subject} onChange={(e) => updatePeriod(i, "subject", e.target.value)} className="border p-2 rounded text-sm" />
              <input placeholder="Room" value={p.room} onChange={(e) => updatePeriod(i, "room", e.target.value)} className="border p-2 rounded text-sm" />
              <button type="button" onClick={() => removePeriod(i)} className="text-red-500 text-sm hover:underline">Remove</button>
            </div>
          ))}

          <button type="button" onClick={addPeriod} className="text-blue-600 text-sm hover:underline">
            + Add Period
          </button>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Save Timetable
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetTimetable;