import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token, then navigate
      localStorage.setItem("token", data.token);
      navigate("/home"); // your home route
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-container">
      <div className="lg-card">
        <h2 className="lg-title">Welcome Back</h2>
        <p className="lg-sub">Sign in to see the latest gossip ✨</p>

        <form onSubmit={handleLogin} className="lg-form">
          <input
            type="email"
            placeholder="Email address"
            className="lg-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="lg-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="lg-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {error && <div className="lg-error">{error}</div>}

        <p className="lg-footer">
          New here? <Link to="/register" className="lg-link">Create account</Link>
        </p>
      </div>
    </div>
  );
}
