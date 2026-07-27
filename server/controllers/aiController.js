const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const { generateText, generateJSON } = require("../utils/gemini");
const Student = require("../models/Student");

const chatbot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "message is required" });

    const prompt = `You are a helpful assistant in a College ERP system. Answer concisely.\n\nStudent: ${message}\nAssistant:`;
    const reply = await generateText(prompt);
    res.json({ data: { reply } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const careerRecommendation = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const prompt = `Student department: ${student.department}, semester: ${student.semester}, CGPA: ${student.cgpa}, skills: ${(student.skills || []).join(", ") || "none"}.
Return JSON: {"recommendedRoles":[{"title":"","reason":""}],"skillGaps":[""],"recommendedProjects":[""]}`;

    const data = await generateJSON(prompt);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const interviewQuestions = async (req, res) => {
  try {
    const { role, count } = req.body;
    if (!role) return res.status(400).json({ message: "role is required" });

    const prompt = `Generate ${count || 5} interview questions for role: "${role}".
Return JSON: {"questions":[{"question":"","category":"technical|behavioral"}]}`;

    const data = await generateJSON(prompt);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resumeReview = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please upload a resume PDF (field name: resume)" });

    const dataBuffer = fs.readFileSync(req.file.path);
    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    const resumeText = result.text;

    fs.unlink(req.file.path, () => {});

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({ message: "Could not extract readable text from the PDF" });
    }

    const prompt = `You are an expert career coach reviewing a resume. Analyze this resume text and return JSON:
{"overallScore": <0-100>, "strengths": [""], "weaknesses": [""], "missingSections": [""], "suggestedImprovements": [""]}

Resume text:
"""${resumeText.slice(0, 8000)}"""`;

    const review = await generateJSON(prompt);
    res.json({ data: review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { chatbot, careerRecommendation, interviewQuestions, resumeReview };