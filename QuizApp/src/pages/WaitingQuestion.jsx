import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function WaitingQuestion() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {};

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code missing in state");
      return;
    }

    console.log("WaitingQuestion mounted with room code:", roomCode);

    const handleQuestionSelected = (questionData) => {
      console.log("Question received:", questionData);
      // Ensure roomCode is properly passed to the next route
      const nextRoomCode = questionData.roomCode || roomCode;
      navigate("/quiz", { 
        state: { 
          question: questionData,
          roomCode: nextRoomCode,
          timeLimit: questionData.timeLimit
        } 
      });
    };

    socket.on("questionSelected", handleQuestionSelected);

    return () => {
      socket.off("questionSelected", handleQuestionSelected);
    };
  }, [socket, roomCode, navigate]);

  if (!roomCode) {
    return <p>Error: Room code is missing. Please restart the game.</p>;
  }

  return (
    <div className="waiting-question-container">
      <h1 className="waiting-question-text">Waiting for the quizmaster to select a question...</h1>
    </div>
  );
}

export default WaitingQuestion;
