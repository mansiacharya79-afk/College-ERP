const Faculty = require("../models/Faculty");
const User = require("../models/User");

const createFaculty = async (req, res) => {
  try {
    const { name, email, password, employeeId, department, designation, subjects } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "A user with this email already exists" });

    const user = await User.create({ name, email, password: password || "Faculty@123", role: "faculty" });
    const faculty = await Faculty.create({ user: user._id, employeeId, department, designation, subjects });

    res.status(201).json({ data: faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().populate("user", "name email");
    res.json({ count: faculty.length, data: faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get the logged-in faculty member's own profile (used by frontend to know their department)
const getMyFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });
    res.json({ data: faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("user", "name email");
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json({ data: faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    const allowedFields = ["department", "designation", "subjects"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) faculty[field] = req.body[field];
    });

    await faculty.save();
    res.json({ data: faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    await User.findByIdAndDelete(faculty.user);
    await faculty.deleteOne();

    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createFaculty, getFaculty, getMyFacultyProfile, getFacultyById, updateFaculty, deleteFaculty };