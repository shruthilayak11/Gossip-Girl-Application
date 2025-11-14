import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import axios from "axios";
import pic from "../assets/hero-image.png";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [navigate]);

  // ✅ Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data.reverse()); // show latest first
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

   const handleCommentSubmit = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts(); // refresh comments
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div>
      

      {/* Hero Section */}
      <section className="hero text-center">
        <h1 className="project-title">GG-APP</h1>
        <p className="project-subtitle">
          Gossip Girl inspired platform – stay anonymous, share secrets, and catch The Tea !!!
        </p>
        <img src={pic} alt="Gossip illustration" className="hero-image" />
      </section>

      {/* Gossip Posts */}
      <section className="posts container mt-5">
        <h2 className="mb-4" style={{ color: "var(--primary-color)" }}>
          Latest Gossips
        </h2>

        {loading ? (
          <p>Loading gossips...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : posts.length === 0 ? (
          <p>No gossips yet. Be the first to spill the tea ☕</p>
        ) : (
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 mb-4" key={post._id}>
                <div className="card card-custom shadow-sm">
                  <div className="card-header fw-bold">Anonymous</div>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    {post.image && (
  <img
    src={`http://localhost:5000${post.image}`}
    alt="Post"
    className="img-fluid rounded mb-3"
    style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
  />
)}
                    <p className="card-text">{post.body}</p>
                    <p className="text-muted small mb-0">
                      Posted on {new Date(post.createdAt).toLocaleDateString("en-GB")}
                    </p>
                     {/* Comments */}
                  <div className="comments-section mt-3">
                    <h6>💬 Comments</h6>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((c, i) => (
                        <p key={i} className="comment-item">
                          <strong>{c.user}</strong>: {c.text}
                        </p>
                      ))
                    ) : (
                      <p className="text-muted small">No comments yet. Be the first!</p>
                    )}

                    {/* Add Comment */}
                    <div className="mt-2 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={commentText[post._id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [post._id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        className="btn btn-dark ms-2"
                        onClick={() => handleCommentSubmit(post._id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
