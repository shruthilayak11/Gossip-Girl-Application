import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // ✅ renamed from "name"
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 13, max: 120, required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
