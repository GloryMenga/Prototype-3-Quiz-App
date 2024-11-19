import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function Question() {
  const [question, setQuestion] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const [currentLap, setCurrentLap] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const roomCode = location.state?.roomCode;

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code missing in Question component");
      return;
    }

    // Set question and listen for answers
    socket.on("questionSelected", (q) => {
      setQuestion(q);
      setPlayerAnswer(null);
      setTotalQuestions(q.totalQuestions); // Total questions from server
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

    socket.on("navigateToResults", (data) => {
      navigate("/result", { 
        state: { 
          roomCode,
          score: data.score,
          totalQuestions: data.totalQuestions,
        },
      });
    });

    return () => {
      socket.off("questionSelected");
      socket.off("answerSubmitted");
      socket.off("turnEnded");
      socket.off("navigateToResults");
    };
  }, [socket, navigate, roomCode]);

  const endTurn = () => {
    if (roomCode) {
      socket.emit("endTurn", { currentLap, roomCode });
      if (currentLap === totalQuestions) {
        navigate("/result", {
          state: {
            roomCode,
            score: location.state?.score || 0,
            totalQuestions,
          },
        });
      }
    }
  };

  const handleSeeResults = () => {
    if (roomCode) {
      navigate("/result", {
        state: {
          roomCode,
          score: location.state?.score || 0,
          totalQuestions: location.state?.totalQuestions || 0,
        },
      });
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
            <>
              {currentLap === totalQuestions ? (
                <button onClick={handleSeeResults}>See Results</button>
              ) : (
                <button onClick={endTurn}>Next Question</button>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default Question;
