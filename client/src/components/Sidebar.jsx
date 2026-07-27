import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Menu, X, LayoutDashboard, Users, GraduationCap, CalendarCheck,
  BookOpen, Briefcase, Clock, MessageSquareText, Sparkles,
  FileText, ListChecks, LogOut, School,
} from "lucide-react";

const navByRole = {
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/students", label: "Students", icon: Users },
    { to: "/faculty", label: "Faculty", icon: GraduationCap },
    { to: "/placements/manage", label: "Placements", icon: Briefcase },
    { to: "/timetable/set", label: "Timetable", icon: Clock },
  ],
  faculty: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/attendance/mark", label: "Mark Attendance", icon: CalendarCheck },
    { to: "/marks/upload", label: "Upload Marks", icon: BookOpen },
    { to: "/timetable/view", label: "Timetable", icon: Clock },
  ],
  student: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/attendance/my", label: "My Attendance", icon: CalendarCheck },
    { to: "/marks/my", label: "My Marks", icon: BookOpen },
    { to: "/timetable/view", label: "Timetable", icon: Clock },
    { to: "/placements/drives", label: "Placements", icon: Briefcase },
    { to: "/ai/chatbot", label: "AI Chatbot", icon: MessageSquareText },
    { to: "/ai/career-recommendation", label: "Career Guide", icon: Sparkles },
    { to: "/ai/interview-questions", label: "Interview Prep", icon: ListChecks },
    { to: "/ai/resume-review", label: "Resume Review", icon: FileText },
  ],
};

function Sidebar() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = navByRole[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 h-screen bg-primary-700 text-white z-30 transition-all duration-300 flex flex-col
          ${open ? "w-64" : "w-0 md:w-20"} overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <div className={`flex items-center gap-2 ${!open && "md:justify-center md:w-full"}`}>
            <div className="bg-secondary-200 rounded-lg p-2 shrink-0">
              <School size={20} className="text-primary-700" />
            </div>
            {open && (
              <div>
                <p className="font-semibold leading-tight text-sm">College ERP</p>
                <p className="text-[10px] text-primary-100">Placement platform</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${active ? "bg-secondary-100 text-primary-700 font-semibold" : "text-primary-100 hover:bg-white/10 hover:translate-x-1"}
                  ${!open && "md:justify-center"}`}
              >
                <Icon size={18} className="shrink-0" />
                {open && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          {open && (
            <div className="mb-3 px-1 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary-200 text-primary-700 text-xs font-semibold flex items-center justify-center shrink-0">
                {user?.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-[11px] text-primary-100 capitalize">{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-red-500 transition-colors duration-200 ${!open && "md:justify-center"}`}
          >
            <LogOut size={16} />
            {open && "Logout"}
          </button>
        </div>
      </aside>

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-40 bg-primary-600 text-white p-2 rounded-lg shadow-lg hover:bg-primary-700 transition-colors md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="hidden md:flex fixed z-40 bg-white text-primary-600 border border-primary-200 p-1.5 rounded-full shadow-md hover:bg-primary-50 transition-all"
        style={{ top: "24px", left: open ? "244px" : "68px", transition: "left 0.3s" }}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
    </>
  );
}

export default Sidebar;