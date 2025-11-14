import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 🔒 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!content.trim()) e.content = "Content is required";
    return e;
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors({ image: "Only JPG, PNG, or WEBP images are allowed" });
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErrors({ image: "Image must be under 3MB" });
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setErrors((prev) => ({ ...prev, image: undefined }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmitted(true);
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-post-wrap">
      <div className="card create-post-card">
        <div className="card-header">Create Gossip (Anonymous)</div>
        <div className="card-body">
          {submitted && (
            <div className="alert alert-success mb-3">
              Gossip submitted!
            </div>
          )}
          {errors.submit && (
            <div className="alert alert-danger mb-3">{errors.submit}</div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Catchy headline…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Content<span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                rows="5"
                placeholder="Spill the tea… keep it respectful ☕"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="char-count">{content.length} / 1000</div>
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Optional Image</label>
              <input
                type="file"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={onImageChange}
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
            </div>

            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="image-preview"
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Gossip"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setTitle("");
                  setContent("");
                  setImageFile(null);
                  setImagePreview(null);
                  setErrors({});
                }}
              >
                Clear
              </button>
            </div>
          </form>

          <p className="mt-3 small text-muted">
            Note: Your identity is hidden from other users. Admin will review
            before publishing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
