import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function WaitingForPlayer() {
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

    console.log("Quizmaster arrived at waiting page, emitting event.");
    socket.emit("arrivedAtWaitingPage", roomCode);

    socket.on("bothReady", () => {
      console.log("Received bothReady event");
      setIsBothReady(true);
    });

    return () => {
      socket.off("bothReady");
    };
  }, [socket, roomCode]);

  const handlePlayGame = () => {
    socket.emit("quizmasterChoosing", roomCode); 
    navigate("/questionchoosing", { state: { roomCode } }); 
  };

  return (
    <div className="waiting-for-player-container">
      <h1>{isBothReady ? "Player is ready!" : "Waiting for player..."}</h1>
      {isBothReady && (
        <button onClick={handlePlayGame}>Start Selecting Question</button>
      )}
    </div>
  );
}

export default WaitingForPlayer;
