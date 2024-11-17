import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import questions from "../assets/questions.json";

function Questionchoosing() {
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const socket = useSocket();

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const sendQuestion = () => {
    if (selectedQuestion) {
      socket.emit("questionSelected", selectedQuestion);
    }
  };

  return (
    <div className="question-container">
      <h1>Select a question for the player:</h1>
      <div className="dropdown-container">
        <label htmlFor="difficulty"><h1>Choose difficulty:</h1></label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="dropdown"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="question-list">
        <h1>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Questions</h1>
        <ul>
          {questions.questions[difficulty].map((q) => (
            <li
              key={q.id}
              className={`question-item ${
                selectedQuestion && selectedQuestion.id === q.id ? "selected" : ""
              }`}
              onClick={() => handleSelectQuestion(q)}
            >
              {q.question}
            </li>
          ))}
        </ul>
      </div>
      <div className="select-button">
        <button type="button" disabled={!selectedQuestion} onClick={sendQuestion}>
          SELECT
        </button>
      </div>
    </div>
  );
}

export default Questionchoosing;
