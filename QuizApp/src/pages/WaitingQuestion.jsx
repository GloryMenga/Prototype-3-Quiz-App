import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function WaitingQuestion() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {}; // Extract roomCode from location state

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code is undefined");
      return;
    }

    socket.on("questionSelected", (question) => {
      console.log("Navigating to Quiz page with question.");
      navigate("/quiz", { state: { question } });
    });

    return () => {
      socket.off("questionSelected");
    };
  }, [socket, roomCode, navigate]);

  return (
    <div className="waiting-question-container">
      <h1 className="waiting-question-text">Waiting for the quizmaster to select a question...</h1>
    </div>
  );
}

export default WaitingQuestion;
