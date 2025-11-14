import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Register User
router.post("/register", async (req, res) => {
  console.log("📥 Register API hit");

  try {
    console.log("👉 Body received:", req.body);

    const { username, email, password, age } = req.body; // 👈 added age
    if (!username || !email || !password || !age) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, age }); // 👈 added here
    await newUser.save();

    console.log("✅ User registered successfully:", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
