import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// ✅ Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// ✅ Add a new question
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Question is required" });

    const newQuestion = new Question({ text });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error adding question" });
  }
});

// ✅ Add an answer to a question
router.post("/:id/answer", async (req, res) => {
  try {
    const { answer } = req.body;
    if (!answer) return res.status(400).json({ message: "Answer required" });

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.answers.push(answer);
    await question.save();

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error adding answer" });
  }
});

export default router;
