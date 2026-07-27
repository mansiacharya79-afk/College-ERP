const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    drive: { type: mongoose.Schema.Types.ObjectId, ref: "Drive", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    status: { type: String, enum: ["registered", "shortlisted", "selected", "rejected"], default: "registered" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);