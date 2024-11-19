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
      console.error("Room code missing in WaitingQuestion");
      return;
    }
  
    console.log("WaitingQuestion mounted with room code:", roomCode);
  
    const handleQuestionSelected = (questionData) => {
      console.log("Question received:", questionData);
      navigate("/quiz", {
        state: {
          question: questionData,
          roomCode,
          timeLimit: questionData.timeLimit,
        },
      });
    };
  
    const handleNavigateToResults = (data) => {
      console.log("Navigating to results:", data);
      navigate("/result", {
        state: {
          roomCode: data.roomCode,
          score: data.score,
          totalQuestions: data.totalQuestions,
        },
      });
    };
  
    socket.on("questionSelected", handleQuestionSelected);
    socket.on("navigateToResults", handleNavigateToResults);
  
    return () => {
      socket.off("questionSelected", handleQuestionSelected);
      socket.off("navigateToResults", handleNavigateToResults);
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
