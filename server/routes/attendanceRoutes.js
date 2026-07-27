const express = require("express");
const { markAttendance, getAttendance, getStudentAttendanceSummary } = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", markAttendance);
router.get("/", getAttendance);
router.get("/student/:studentId", getStudentAttendanceSummary);

module.exports = router;