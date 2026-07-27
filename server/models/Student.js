const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    batch: { type: String, required: true },
    section: { type: String },
    phone: { type: String },
    cgpa: { type: Number, default: 0 },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);