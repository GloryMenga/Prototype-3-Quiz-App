import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Question() {
  const [question, setQuestion] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the selected question
    socket.on("questionSelected", (q) => setQuestion(q));

    // Listen for the player's answer
    socket.on("answerSubmitted", (answer) => setPlayerAnswer(answer));

    // Handle end of turn
    socket.on("turnEnded", () => {
      navigate("/questionchoosing"); // Navigate back to question choosing
    });

    return () => {
      socket.off("questionSelected");
      socket.off("answerSubmitted");
      socket.off("turnEnded");
    };
  }, [socket, navigate]);

  const endTurn = () => {
    socket.emit("endTurn"); // Notify the server to proceed to the next question
    navigate("/questionchoosing");
  };

  return (
    <div className="quizmaster-view">
      {question ? (
        <>
          <div className="question">
            <h1>{question.title}</h1>
            <p>{question.text}</p>
          </div>

          <div className="player-answer">
            <h1>Player's Answer:</h1>
            <p>{playerAnswer || "Waiting for player to answer..."}</p>
          </div>

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
