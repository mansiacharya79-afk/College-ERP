import { useState } from "react";
import axios from "axios";

function AIResumeReview() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/ai/resume-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to review resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">AI Resume Review</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 block w-full text-sm"
          />
          <button type="submit" disabled={loading || !file} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Analyzing..." : "Upload & Review"}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-slate-800">Overall Score</h2>
              <p className="text-3xl font-bold text-blue-600">{result.overallScore}/100</p>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-1">Strengths</h2>
              <ul className="list-disc list-inside text-sm text-green-700">
                {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-1">Weaknesses</h2>
              <ul className="list-disc list-inside text-sm text-red-600">
                {result.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-1">Missing Sections</h2>
              <ul className="list-disc list-inside text-sm text-slate-600">
                {result.missingSections?.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-1">Suggested Improvements</h2>
              <ul className="list-disc list-inside text-sm text-slate-600">
                {result.suggestedImprovements?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIResumeReview;