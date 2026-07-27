const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    subject: { type: String, required: true },
    examType: { type: String, enum: ["internal1", "internal2", "internal3", "assignment", "semester"], required: true },
    marksObtained: { type: Number, required: true },
    maxMarks: { type: Number, required: true },
    semester: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marks", marksSchema);