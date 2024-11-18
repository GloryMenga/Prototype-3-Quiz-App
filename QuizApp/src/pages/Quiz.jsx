import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // Default time, will be updated based on room settings
  const [progress, setProgress] = useState(100);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the question from navigation state or socket
    const stateQuestion = location.state?.question;
    if (stateQuestion) {
      setQuestion(stateQuestion);
    } else {
      socket.on("questionSelected", (q) => setQuestion(q));
    }

    // Listen for the quiz end
    socket.on("quizEnded", () => {
      navigate("/result");
    });

    return () => {
      socket.off("questionSelected");
      socket.off("quizEnded");
    };
  }, [location, socket, navigate]);

  useEffect(() => {
    // Handle timer countdown
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress((prev) => (prev > 0 ? prev - 10 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleTimeUp = () => {
    socket.emit("answerSubmitted", { questionId: question.id, answer: null });
    navigate("/waitingquestion"); // Go back to waiting for the next question
  };

  const submitAnswer = () => {
    socket.emit("answerSubmitted", { questionId: question.id, answer: selectedAnswer });
    navigate("/waitingquestion"); // Navigate back to waiting after submitting
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
            <p>Time left: {timeLeft}s</p>
          </div>

          <div className="answer-options">
            {question.options.map((answer, index) => (
              <div
                key={index}
                className={`answer ${selectedAnswer === answer ? "selected" : ""}`}
                onClick={() => setSelectedAnswer(answer)}
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
