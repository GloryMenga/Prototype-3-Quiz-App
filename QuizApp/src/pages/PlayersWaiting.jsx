import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function PlayersWaiting() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {}; // Get room code passed from CreateRoom
  const [playerCount, setPlayerCount] = useState(1); // Quizmaster is already in

  useEffect(() => {
    socket.on("playerJoined", (count) => {
      setPlayerCount(count);
    });
  
    socket.on("roomReady", () => {
      setPlayerCount(2); // Both players connected
    });
  
    socket.on("roomClosed", () => {
      alert("The room has been closed.");
      navigate("/");
    });
  
    return () => {
      socket.off("playerJoined");
      socket.off("roomReady");
      socket.off("roomClosed");
    };
  }, [socket, navigate]);

  const handleStartGame = () => {
    socket.emit("startGame", roomCode);
    navigate("/rolepicking");
  };

  return (
    <div className="players-waiting-container">
      <h1>Room Code: {roomCode}</h1>
      <p>{playerCount}/2 players connected</p>
      {playerCount < 2 ? (
        <p>Waiting for players to join...</p>
      ) : (
        <button onClick={handleStartGame}>START GAME</button>
      )}
    </div>
  );
}

export default PlayersWaiting;
