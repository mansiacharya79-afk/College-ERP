const express = require("express");
const {
  createFaculty,
  getFaculty,
  getMyFacultyProfile,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", createFaculty);
router.get("/", getFaculty);
router.get("/me", getMyFacultyProfile); // must come BEFORE /:id, order matters
router.get("/:id", getFacultyById);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;