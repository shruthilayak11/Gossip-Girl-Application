import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // username or "Anonymous"
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String }, // optional image path
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
},
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
