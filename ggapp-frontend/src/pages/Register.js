import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(""); // ✅ added age
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password || !age)
      return setError("Please fill all fields.");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, age: Number(age) }), // ✅ include age
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // success: go to login
      setUsername("");
      setEmail("");
      setPassword("");
      setAge(""); // ✅ reset age
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rg-container">
      <div className="rg-card">
        <h2 className="rg-title">Create Account</h2>
        <p className="rg-sub">Join GG-APP — stay anonymous, spill the tea.</p>

        <form onSubmit={handleRegister} className="rg-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rg-input"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rg-input"
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rg-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rg-input"
            required
          />

          <button type="submit" className="rg-btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {error && <div className="rg-error">{error}</div>}

        <p className="rg-footer">
          Already on GG-APP? <Link to="/login" className="rg-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
