const Marks = require("../models/Marks");
const Timetable = require("../models/Timetable");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");

const uploadMarks = async (req, res) => {
  try {
    const { student, subject, examType, marksObtained, maxMarks, semester } = req.body;

    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty) return res.status(403).json({ message: "Only faculty can upload marks" });

    const studentDoc = await Student.findById(student);
    if (!studentDoc) return res.status(404).json({ message: "Student not found" });

    if (faculty.department !== studentDoc.department) {
      return res.status(403).json({ message: `Invalid department. You belong to ${faculty.department} and cannot upload marks for students in other departments.` });
    }

    const record = await Marks.create({
      student, subject, examType, marksObtained, maxMarks, semester, uploadedBy: faculty._id,
    });

    res.status(201).json({ data: record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMarks = async (req, res) => {
  try {
    const { student } = req.query;
    const filter = {};
    if (student) filter.student = student;

    const marks = await Marks.find(filter);
    res.json({ count: marks.length, data: marks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const upsertTimetable = async (req, res) => {
  try {
    const { department, semester, section, periods } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { department, semester, section: section || null },
      { department, semester, section: section || null, periods },
      { new: true, upsert: true }
    );

    res.status(201).json({ data: timetable });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTimetable = async (req, res) => {
  try {
    const { department, semester, section } = req.query;
    const timetable = await Timetable.findOne({
      department, semester: Number(semester), section: section || null,
    });

    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    res.json({ data: timetable });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadMarks, getMarks, upsertTimetable, getTimetable };