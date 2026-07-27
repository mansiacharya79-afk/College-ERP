const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
    room: { type: String },
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    section: { type: String },
    periods: [periodSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);