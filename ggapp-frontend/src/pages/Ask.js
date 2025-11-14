import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Ask.css";

function Ask() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  // ✅ Load questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  } else {
    fetchQuestions(); // only fetch if logged in
  }
}, [navigate]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  // ✅ Add a new question
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:5000/api/questions", {
        text: question,
      });
      setQuestions([res.data, ...questions]);
      setQuestion("");
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  // ✅ Add an answer to a question
  const handleAnswer = async (id, answerText) => {
    if (answerText.trim() === "") return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/questions/${id}/answer`,
        { answer: answerText }
      );
      setQuestions(
        questions.map((q) => (q._id === id ? res.data : q))
      );
    } catch (err) {
      console.error("Error adding answer:", err);
    }
  };

  return (
    <div className="ask-container">
      <h2 className="ask-title">Ask Anonymously 💭</h2>
      <p className="ask-subtitle">
        Post your doubts or questions — stay hidden, get answers!
      </p>

      {/* Question Form */}
      <form onSubmit={handleSubmit} className="ask-form">
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit" className="ask-btn">
          Ask
        </button>
      </form>

      {/* Questions List */}
      <div className="questions-list">
        {questions.map((q) => (
          <div key={q._id} className="question-card">
            <p className="question-text">❓ {q.text}</p>

            {/* Answers */}
            <div className="answers">
              {q.answers.length > 0 ? (
                q.answers.map((ans, i) => (
                  <p key={i} className="answer">
                    💬 {ans}
                  </p>
                ))
              ) : (
                <p className="no-answer">
                  No answers yet. Be the first to reply!
                </p>
              )}
            </div>

            {/* Answer Form */}
            <AnswerForm onSubmit={(ans) => handleAnswer(q._id, ans)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnswerForm({ onSubmit }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <input
        type="text"
        placeholder="Write an answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit" className="reply-btn">
        Reply
      </button>
    </form>
  );
}

export default Ask;
