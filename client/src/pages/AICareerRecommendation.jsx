import { useState } from "react";
import api from "../api/axios";

function AICareerRecommendation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/ai/career-recommendation");
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">AI Career Recommendation</h1>

        <button onClick={handleGenerate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
          {loading ? "Generating..." : "Get My Career Recommendations"}
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {data && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-slate-800 mb-2">Recommended Roles</h2>
              {data.recommendedRoles?.map((r, i) => (
                <div key={i} className="mb-2 p-3 bg-slate-50 rounded">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-slate-500">{r.reason}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 mb-2">Skill Gaps</h2>
              <ul className="list-disc list-inside text-sm text-slate-600">
                {data.skillGaps?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 mb-2">Recommended Projects</h2>
              <ul className="list-disc list-inside text-sm text-slate-600">
                {data.recommendedProjects?.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AICareerRecommendation;