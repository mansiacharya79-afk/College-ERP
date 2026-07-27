import { useState } from "react";
import api from "../api/axios";

function ViewTimetable() {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setTimetable(null);
    try {
      const res = await api.get("/academics/timetable", { params: { department, semester, section } });
      setTimetable(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Timetable not found");
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Timetable</h1>

        <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-4 gap-3">
          <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2 rounded" required />
          <input placeholder="Semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2 rounded" required />
          <input placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white rounded hover:bg-blue-700">View</button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {timetable && (
          <div className="space-y-4">
            {days.map((day) => {
              const dayPeriods = timetable.periods.filter((p) => p.day === day);
              if (dayPeriods.length === 0) return null;
              return (
                <div key={day} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="font-semibold text-slate-800 mb-2">{day}</h2>
                  {dayPeriods.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm border-t py-2">
                      <span>{p.startTime} - {p.endTime}</span>
                      <span className="font-medium">{p.subject}</span>
                      <span className="text-slate-500">{p.room}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTimetable;