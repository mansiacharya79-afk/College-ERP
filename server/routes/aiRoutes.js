const express = require("express");
const { chatbot, careerRecommendation, interviewQuestions, resumeReview } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();
router.use(protect);

router.post("/chatbot", chatbot);
router.post("/career-recommendation", careerRecommendation);
router.post("/interview-questions", interviewQuestions);
router.post("/resume-review", upload.single("resume"), resumeReview);

module.exports = router;