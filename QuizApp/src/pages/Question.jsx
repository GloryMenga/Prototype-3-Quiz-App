import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation

function Question() {
  const [question, setQuestion] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const [currentLap, setCurrentLap] = useState(1);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation(); // Ensure useLocation is defined
  const roomCode = location.state?.roomCode;

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code missing in Question component");
      return;
    }

    socket.on("questionSelected", (q) => {
      setQuestion(q);
      setPlayerAnswer(null);
    });

    socket.on("answerSubmitted", (data) => {
      if (typeof data === "object" && data.playerAnswer) {
        setPlayerAnswer(data.playerAnswer);
      }
    });

    socket.on("turnEnded", () => {
      setCurrentLap((prev) => prev + 1);
      navigate("/questionchoosing", { state: { roomCode } });
    });

    socket.on("quizEnded", () => {
      navigate("/result", { state: { roomCode } });
    });

    return () => {
      socket.off("questionSelected");
      socket.off("answerSubmitted");
      socket.off("turnEnded");
      socket.off("quizEnded");
    };
  }, [socket, navigate, roomCode]);

  const endTurn = () => {
    if (roomCode) {
      socket.emit("endTurn", { currentLap, roomCode });
    }
  };

  return (
    <div className="quizmaster-view">
      {question ? (
        <>
          <div className="question">
            <h1>Question {currentLap}</h1>
            <p>{question.question}</p>
          </div>

          <div className="player-answer">
            <h1>Answer:</h1>
            <p>{playerAnswer || "Waiting for player to answer..."}</p>
          </div>

          {playerAnswer && (
            <div className="correct-answer">
              <h1>Correct Answer:</h1>
              <p>{question.answer}</p>
              <p>
                Result: {playerAnswer === question.answer ? "Correct ✅" : "Incorrect ❌"}
              </p>
            </div>
          )}

          {playerAnswer && (
            <button onClick={endTurn}>Next Question</button>
          )}
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default Question;
