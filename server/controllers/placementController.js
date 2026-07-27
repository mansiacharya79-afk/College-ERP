const Company = require("../models/Company");
const Drive = require("../models/Drive");
const Registration = require("../models/Registration");
const Student = require("../models/Student");

const addCompany = async (req, res) => {
  try {
    const { name, description, website, industry } = req.body;
    const company = await Company.create({ name, description, website, industry, createdBy: req.user._id });
    res.status(201).json({ data: company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json({ count: companies.length, data: companies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDrive = async (req, res) => {
  try {
    const { company, role, package: pkg, eligibility, driveDate, registrationDeadline, status } = req.body;
    const drive = await Drive.create({
      company, role, package: pkg, eligibility, driveDate, registrationDeadline,
      status: status || "upcoming", createdBy: req.user._id,
    });
    res.status(201).json({ data: drive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find().populate("company", "name industry");
    res.json({ count: drives.length, data: drives });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerForDrive = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: "Drive not found" });

    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const existing = await Registration.findOne({ drive: drive._id, student: student._id });
    if (existing) return res.status(400).json({ message: "Already registered for this drive" });

    const registration = await Registration.create({ drive: drive._id, student: student._id });
    res.status(201).json({ data: registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCompany, getCompanies, createDrive, getDrives, registerForDrive };