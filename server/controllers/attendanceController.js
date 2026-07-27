const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const markAttendance = async (req, res) => {
  try {
    const { subject, department, semester, section, date, records } = req.body;

    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty) return res.status(403).json({ message: "Only faculty accounts can mark attendance" });

    if (faculty.department !== department) {
      return res.status(403).json({ message: `Invalid department. You belong to ${faculty.department} and cannot mark attendance for other departments.` });
    }

    const attendance = await Attendance.create({
      subject,
      department,
      semester,
      section,
      date,
      markedBy: faculty._id,
      records,
    });

    res.status(201).json({ data: attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("markedBy", "employeeId")
      .populate("records.student", "rollNumber");
    res.json({ count: records.length, data: records });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const sessions = await Attendance.find({ "records.student": studentId });

    const summary = {};
    sessions.forEach((session) => {
      const record = session.records.find((r) => String(r.student) === String(studentId));
      if (!record) return;
      if (!summary[session.subject]) summary[session.subject] = { total: 0, present: 0 };
      summary[session.subject].total += 1;
      if (record.status === "present" || record.status === "late") summary[session.subject].present += 1;
    });

    const result = Object.entries(summary).map(([subject, s]) => ({
      subject,
      totalClasses: s.total,
      attended: s.present,
      percentage: s.total ? Number(((s.present / s.total) * 100).toFixed(2)) : 0,
    }));

    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { markAttendance, getAttendance, getStudentAttendanceSummary };