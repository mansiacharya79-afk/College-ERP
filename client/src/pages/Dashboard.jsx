import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users, GraduationCap, Briefcase, UserPlus, CalendarCheck, Sparkles, BookOpen, Clock, FileText, ListChecks, MessageSquareText } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <p className="text-2xl font-semibold text-primary-700">Welcome back, {user?.name}</p>
        <p className="text-sm text-primary-500 mb-6 capitalize">{user?.role} · Here's what's happening on campus today</p>

        {user?.role === "admin" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard icon={Users} value="—" label="Students" color="bg-primary-700" />
              <StatCard icon={GraduationCap} value="—" label="Faculty" color="bg-secondary-600" />
              <StatCard icon={Briefcase} value="—" label="Open drives" color="bg-primary-400" />
            </div>

            <p className="text-sm font-semibold text-primary-700 mb-3">Quick actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ActionCard to="/students/add" icon={UserPlus} label="Add student" />
              <ActionCard to="/faculty/add" icon={GraduationCap} label="Add faculty" />
              <ActionCard to="/placements/manage" icon={Briefcase} label="Manage placements" />
            </div>
          </>
        )}

        {user?.role === "faculty" && (
          <>
            <p className="text-sm font-semibold text-primary-700 mb-3">Quick actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ActionCard to="/attendance/mark" icon={CalendarCheck} label="Mark attendance" />
              <ActionCard to="/marks/upload" icon={BookOpen} label="Upload marks" />
              <ActionCard to="/timetable/view" icon={Clock} label="View timetable" />
            </div>
          </>
        )}

        {user?.role === "student" && (
          <>
            <p className="text-sm font-semibold text-primary-700 mb-3">My records</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <ActionCard to="/attendance/my" icon={CalendarCheck} label="My attendance" />
              <ActionCard to="/marks/my" icon={BookOpen} label="My marks" />
              <ActionCard to="/timetable/view" icon={Clock} label="Timetable" />
              <ActionCard to="/placements/drives" icon={Briefcase} label="Placement drives" />
            </div>

            <p className="text-sm font-semibold text-primary-700 mb-3">AI career tools</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <ActionCard to="/ai/chatbot" icon={MessageSquareText} label="AI chatbot" accent />
              <ActionCard to="/ai/career-recommendation" icon={Sparkles} label="Career guide" accent />
              <ActionCard to="/ai/interview-questions" icon={ListChecks} label="Interview prep" accent />
              <ActionCard to="/ai/resume-review" icon={FileText} label="Resume review" accent />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className={`${color} text-white rounded-xl p-5 flex items-center gap-4 card-hover cursor-default`}>
      <Icon size={26} className="opacity-90" />
      <div>
        <p className="text-2xl font-semibold leading-tight">{value}</p>
        <p className="text-xs opacity-90">{label}</p>
      </div>
    </div>
  );
}

function ActionCard({ to, icon: Icon, label, accent }) {
  return (
    <Link
      to={to}
      className={`bg-white border rounded-xl p-5 flex flex-col items-center gap-2 text-center card-hover ${
        accent ? "border-secondary-200 hover:border-secondary-600" : "border-primary-100 hover:border-primary-400"
      }`}
    >
      <Icon size={22} className={accent ? "text-secondary-600" : "text-primary-600"} />
      <span className="text-xs font-medium text-primary-700">{label}</span>
    </Link>
  );
}

export default Dashboard;