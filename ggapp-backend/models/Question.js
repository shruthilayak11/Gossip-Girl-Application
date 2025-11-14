import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
