import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const roomCode = location.state?.roomCode;

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code missing in Quiz component");
      return;
    }

    const stateQuestion = location.state?.question;
    const timeLimitFromServer = location.state?.timeLimit;
    
    if (stateQuestion) {
      setQuestion(stateQuestion);
      setTimeLeft(parseInt(timeLimitFromServer));
      setProgress(100);
    }

    socket.on("questionSelected", (q) => {
      setQuestion(q);
      setTimeLeft(parseInt(q.timeLimit));
      setProgress(100);
    });

    return () => {
      socket.off("questionSelected");
    };
  }, [location, socket, roomCode]);

  const handleTimeUp = () => {
    if (!roomCode) return;
    socket.emit("answerSubmitted", { 
      questionId: question.id, 
      answer: null,
      roomCode 
    });
    navigate("/waitingquestion", { state: { roomCode } });
  };

  const submitAnswer = () => {
    if (selectedAnswer && roomCode) {
      socket.emit("answerSubmitted", { 
        questionId: question.id, 
        answer: selectedAnswer,
        roomCode 
      });
      navigate("/waitingquestion", { state: { roomCode } });
    }
  };

  return (
    <div className="quiz-container">
      {question ? (
        <>
          <div className="question">
            <h1>{question.question}</h1> {/* Display the question */}
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