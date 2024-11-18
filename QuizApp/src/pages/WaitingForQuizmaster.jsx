import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function WaitingForQuizmaster() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {}; 

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code is undefined");
      return;
    }

    console.log("Player arrived at waiting page with room code:", roomCode);
    socket.emit("arrivedAtWaitingPage", roomCode);

    socket.on("navigateToWaitingQuestion", (data) => {
      console.log("Navigating to WaitingQuestion with room code:", roomCode);
      navigate("/waitingquestion", { 
        state: { 
          roomCode: data.roomCode || roomCode 
        } 
      });
    });

    return () => {
      socket.off("navigateToWaitingQuestion");
    };
  }, [socket, roomCode, navigate]);

  return (
    <div className="waiting-for-quizmaster-container">
      <h1>Waiting for quizmaster...</h1>
    </div>
  );
}

export default WaitingForQuizmaster;
