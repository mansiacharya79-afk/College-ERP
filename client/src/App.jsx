import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Faculty from "./pages/Faculty";
import AddFaculty from "./pages/AddFaculty";
import EditFaculty from "./pages/EditFaculty";
import MarkAttendance from "./pages/MarkAttendance";
import MyAttendance from "./pages/MyAttendance";
import UploadMarks from "./pages/UploadMarks";
import MyMarks from "./pages/MyMarks";
import AddCompanyDrive from "./pages/AddCompanyDrive";
import PlacementDrives from "./pages/PlacementDrives";
import SetTimetable from "./pages/SetTimetable";
import ViewTimetable from "./pages/ViewTimetable";
import AIChatbot from "./pages/AIChatbot";
import AICareerRecommendation from "./pages/AICareerRecommendation";
import AIInterviewQuestions from "./pages/AIInterviewQuestions";
import AIResumeReview from "./pages/AIResumeReview";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/students" element={<ProtectedRoute allowedRoles={["admin"]}><Students /></ProtectedRoute>} />
      <Route path="/students/add" element={<ProtectedRoute allowedRoles={["admin"]}><AddStudent /></ProtectedRoute>} />
      <Route path="/students/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><EditStudent /></ProtectedRoute>} />

      <Route path="/faculty" element={<ProtectedRoute allowedRoles={["admin"]}><Faculty /></ProtectedRoute>} />
      <Route path="/faculty/add" element={<ProtectedRoute allowedRoles={["admin"]}><AddFaculty /></ProtectedRoute>} />
      <Route path="/faculty/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><EditFaculty /></ProtectedRoute>} />

      <Route path="/attendance/mark" element={<ProtectedRoute allowedRoles={["faculty"]}><MarkAttendance /></ProtectedRoute>} />
      <Route path="/attendance/my" element={<ProtectedRoute allowedRoles={["student"]}><MyAttendance /></ProtectedRoute>} />

      <Route path="/marks/upload" element={<ProtectedRoute allowedRoles={["faculty"]}><UploadMarks /></ProtectedRoute>} />
      <Route path="/marks/my" element={<ProtectedRoute allowedRoles={["student"]}><MyMarks /></ProtectedRoute>} />

      <Route path="/placements/manage" element={<ProtectedRoute allowedRoles={["admin"]}><AddCompanyDrive /></ProtectedRoute>} />
      <Route path="/placements/drives" element={<ProtectedRoute allowedRoles={["student"]}><PlacementDrives /></ProtectedRoute>} />

      <Route path="/timetable/set" element={<ProtectedRoute allowedRoles={["admin"]}><SetTimetable /></ProtectedRoute>} />
      <Route path="/timetable/view" element={<ProtectedRoute allowedRoles={["faculty", "student"]}><ViewTimetable /></ProtectedRoute>} />

      <Route path="/ai/chatbot" element={<ProtectedRoute allowedRoles={["student"]}><AIChatbot /></ProtectedRoute>} />
      <Route path="/ai/career-recommendation" element={<ProtectedRoute allowedRoles={["student"]}><AICareerRecommendation /></ProtectedRoute>} />
      <Route path="/ai/interview-questions" element={<ProtectedRoute allowedRoles={["student"]}><AIInterviewQuestions /></ProtectedRoute>} />
      <Route path="/ai/resume-review" element={<ProtectedRoute allowedRoles={["student"]}><AIResumeReview /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;