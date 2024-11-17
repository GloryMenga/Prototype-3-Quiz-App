import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("questionSelected", (q) => {
      setQuestion(q);
      setAnswers(q.options); // Assuming options contain possible answers
    });

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress((prev) => (prev > 0 ? prev - 10 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      socket.emit("answerTimeUp");
    }
  }, [socket, timeLeft]);

  const submitAnswer = () => {
    socket.emit("submitAnswer", {
      answer: selectedAnswer,
      questionId: question.id,
    });
    navigate("/result"); // Move to results page after submitting
  };

  return (
    <div className="quiz-container">
      {question ? (
        <>
          <div className="question">
            <h1>{question.title}</h1>
            <p>{question.text}</p>
          </div>

          <div className="timer">
            <div className="timer-track">
              <div className="timer-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="answer-options">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`answer ${selectedAnswer === index ? "selected" : ""}`}
                onClick={() => setSelectedAnswer(index)}
              >
                {answer}
              </div>
            ))}
          </div>

          <div className="next">
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={submitAnswer}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default Quiz;
