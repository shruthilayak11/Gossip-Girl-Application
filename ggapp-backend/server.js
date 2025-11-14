import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ⬅️ serve images

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
