const express = require("express");
const { uploadMarks, getMarks, upsertTimetable, getTimetable } = require("../controllers/academicController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/marks", uploadMarks);
router.get("/marks", getMarks);
router.post("/timetable", upsertTimetable);
router.get("/timetable", getTimetable);

module.exports = router;