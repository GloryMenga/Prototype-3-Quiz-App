import React, { useState } from "react";
import questions from "../assets/questions.json"; 

function Questionchoosing() {
  const [difficulty, setDifficulty] = useState("easy"); 
  const [selectedQuestion, setSelectedQuestion] = useState(null); 
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setSelectedQuestion(null); 
  };

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="question-container">
      <h1>Select a question for the player:</h1>
      <div className="dropdown-container">
        <label htmlFor="difficulty"><h1>Choose difficulty:</h1></label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
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
        <button
          type="button"
          disabled={!selectedQuestion}
          onClick={() => alert(`Selected Question: ${selectedQuestion?.question}`)}
        >
          SELECT
        </button>
      </div>
    </div>
  );
}

export default Questionchoosing;
