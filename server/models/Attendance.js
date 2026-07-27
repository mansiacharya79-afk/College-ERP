const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    section: { type: String },
    date: { type: Date, required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
    records: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        status: { type: String, enum: ["present", "absent", "late"], default: "present" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);