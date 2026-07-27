const Student = require("../models/Student");
const User = require("../models/User");

const createStudent = async (req, res) => {
  try {
    const { name, email, password, rollNumber, department, semester, batch, section } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password: password || "Student@123",
      role: "student",
    });

    const student = await Student.create({
      user: user._id,
      rollNumber,
      department,
      semester,
      batch,
      section,
    });

    res.status(201).json({ data: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Now supports ?department=... query filter
const getStudents = async (req, res) => {
  try {
    const { department, semester, section } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester);
    if (section) filter.section = section;

    const students = await Student.find(filter).populate("user", "name email");
    res.json({ count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("user", "name email");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ data: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const allowedFields = ["department", "semester", "batch", "section", "phone", "cgpa", "skills"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    await student.save();
    res.json({ data: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndDelete(student.user);
    await student.deleteOne();

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };