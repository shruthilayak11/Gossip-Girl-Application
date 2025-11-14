import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});
const upload = multer({ storage });

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

// Create a post (with optional image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content are required" });

    const newPost = new Post({
      title,
      body: content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      author: decoded.id,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Post error:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
});

router.post("/:postId/comments", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: "Anonymous", // or req.user.name if you have auth
      text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", comments: post.comments });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all comments for a post
router.get("/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
