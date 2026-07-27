const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    role: { type: String, required: true },
    package: { type: String },
    eligibility: {
      minCgpa: { type: Number, default: 0 },
      departments: [{ type: String }],
    },
    driveDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    status: { type: String, enum: ["upcoming", "open", "closed", "completed"], default: "upcoming" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Drive", driveSchema);