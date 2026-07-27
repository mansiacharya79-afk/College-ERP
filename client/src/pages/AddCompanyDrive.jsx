import { useState, useEffect } from "react";
import api from "../api/axios";

function AddCompanyDrive() {
  const [companies, setCompanies] = useState([]);
  const [companyForm, setCompanyForm] = useState({ name: "", description: "", website: "", industry: "" });
  const [driveForm, setDriveForm] = useState({
    company: "", role: "", package: "", driveDate: "", registrationDeadline: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadCompanies = async () => {
    try {
      const res = await api.get("/placements/companies");
      setCompanies(res.data.data);
    } catch (err) {
      setError("Failed to load companies");
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/placements/companies", companyForm);
      setMessage("Company added!");
      setCompanyForm({ name: "", description: "", website: "", industry: "" });
      loadCompanies();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add company");
    }
  };

  const handleDriveSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/placements/drives", driveForm);
      setMessage("Drive created!");
      setDriveForm({ company: "", role: "", package: "", driveDate: "", registrationDeadline: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create drive");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">Placements — Admin</h1>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <form onSubmit={handleCompanySubmit} className="bg-white p-6 rounded-lg shadow-md space-y-3">
          <h2 className="font-semibold text-slate-800 mb-2">Add Company</h2>
          <input placeholder="Company Name" value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} className="w-full border p-2 rounded" required />
          <input placeholder="Description" value={companyForm.description} onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })} className="w-full border p-2 rounded" />
          <input placeholder="Website" value={companyForm.website} onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })} className="w-full border p-2 rounded" />
          <input placeholder="Industry" value={companyForm.industry} onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })} className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Company</button>
        </form>

        <form onSubmit={handleDriveSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-3">
          <h2 className="font-semibold text-slate-800 mb-2">Create Placement Drive</h2>
          <select value={driveForm.company} onChange={(e) => setDriveForm({ ...driveForm, company: e.target.value })} className="w-full border p-2 rounded" required>
            <option value="">Select Company</option>
            {companies.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input placeholder="Role (e.g. SDE Intern)" value={driveForm.role} onChange={(e) => setDriveForm({ ...driveForm, role: e.target.value })} className="w-full border p-2 rounded" required />
          <input placeholder="Package (e.g. 6 LPA)" value={driveForm.package} onChange={(e) => setDriveForm({ ...driveForm, package: e.target.value })} className="w-full border p-2 rounded" />
          <label className="text-sm text-slate-500">Drive Date</label>
          <input type="date" value={driveForm.driveDate} onChange={(e) => setDriveForm({ ...driveForm, driveDate: e.target.value })} className="w-full border p-2 rounded" required />
          <label className="text-sm text-slate-500">Registration Deadline</label>
          <input type="date" value={driveForm.registrationDeadline} onChange={(e) => setDriveForm({ ...driveForm, registrationDeadline: e.target.value })} className="w-full border p-2 rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Drive</button>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyDrive;