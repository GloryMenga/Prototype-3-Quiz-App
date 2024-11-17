import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

function WaitingForPlayer() {
  const socket = useSocket();
  const [playerCount, setPlayerCount] = useState(1); // Quizmaster already in

  useEffect(() => {
    socket.on("playerJoined", (count) => {
      setPlayerCount(count);
    });

    socket.on("roomReady", () => {
      // Proceed to the next step when the room is ready
      socket.emit("startGame"); // Inform the server that the quizmaster is ready
    });

    return () => {
      socket.off("playerJoined");
      socket.off("roomReady");
    };
  }, [socket]);

  return (
    <div className="waiting-for-player-container">
      <p className="waiting-for-player-text">Waiting for a player...</p>
      <p className="waiting-for-player-role">1/1 Quizmaster</p>
      <p className="waiting-for-player-role">{playerCount}/1 Player</p>
    </div>
  );
}

export default WaitingForPlayer;
