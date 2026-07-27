import { useState } from "react";
import api from "../api/axios";

function AIInterviewQuestions() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/ai/interview-questions", { role, count: 5 });
      setQuestions(res.data.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">AI Interview Question Generator</h1>

        <form onSubmit={handleGenerate} className="flex gap-2 mb-6">
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Target role (e.g. Backend Developer)"
            className="flex-1 border p-2 rounded"
            required
          />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-medium">{q.question}</p>
              <span className="text-xs text-blue-500 uppercase">{q.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AIInterviewQuestions;