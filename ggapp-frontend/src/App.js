import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Ask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";
import CreatePost from "./pages/CreatePost";
import Ask from "./pages/Ask";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<CreatePost />} />   
          <Route path="/about" element={<About />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
