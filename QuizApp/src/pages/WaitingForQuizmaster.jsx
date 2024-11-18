import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function WaitingForQuizmaster() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {}; // Extract roomCode from location state
  const [isBothReady, setIsBothReady] = useState(false);

  useEffect(() => {
    if (!roomCode) {
      console.error("Room code is undefined");
      return;
    }

    console.log("Player arrived at waiting page, emitting event.");
    socket.emit("arrivedAtWaitingPage", roomCode);

    // Listen for event to navigate to WaitingQuestion
    socket.on("navigateToWaitingQuestion", (data) => {
      console.log("Navigating to WaitingQuestion page for Player.");
      navigate("/waitingquestion", { state: { roomCode: data.roomCode } });
    });

    return () => {
      socket.off("navigateToWaitingQuestion");
    };
  }, [socket, roomCode, navigate]);

  return (
    <div className="waiting-for-quizmaster-container">
      <h1>{isBothReady ? "Quizmaster is ready!" : "Waiting for quizmaster..."}</h1>
      {isBothReady && <p>You will be redirected when the Quizmaster starts selecting questions.</p>}
    </div>
  );
}

export default WaitingForQuizmaster;
