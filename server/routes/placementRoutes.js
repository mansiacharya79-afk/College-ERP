const express = require("express");
const { addCompany, getCompanies, createDrive, getDrives, registerForDrive } = require("../controllers/placementController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/companies", addCompany);
router.get("/companies", getCompanies);
router.post("/drives", createDrive);
router.get("/drives", getDrives);
router.post("/drives/:id/register", registerForDrive);

module.exports = router;