import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function PlayersWaiting() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state || {}; 
  const [playerCount, setPlayerCount] = useState(1); 

  useEffect(() => {
    socket.on("playerJoined", (count) => {
      setPlayerCount(count);
    });

    socket.on("roomReady", () => {
      setPlayerCount(2); 
    });

    socket.on("roomClosed", () => {
      alert("The room has been closed.");
      navigate("/");
    });

    socket.on("navigateToWaitingForPlayer", () => {
      console.log("Redirecting quizmaster to WaitingForPlayer.");
      navigate("/waitingforplayer", { state: { roomCode } });
    });

    socket.on("navigateToWaitingForQuizmaster", () => {
      console.log("Redirecting player to WaitingForQuizmaster.");
      navigate("/waitingforquizmaster", { state: { roomCode } });
    });

    return () => {
      socket.off("playerJoined");
      socket.off("roomReady");
      socket.off("roomClosed");
      socket.off("navigateToWaitingForPlayer");
      socket.off("navigateToWaitingForQuizmaster");
    };
  }, [socket, navigate]);

  const handleStartGame = () => {
    socket.emit("startQuiz", roomCode); 
    
    socket.on("navigateToWaitingForPlayer", (data) => {
      console.log("Redirecting quizmaster to WaitingForPlayer.");
      navigate("/waitingforplayer", { state: { roomCode: data.roomCode } });
    });
  
    socket.on("navigateToWaitingForQuizmaster", (data) => {
      console.log("Redirecting player to WaitingForQuizmaster.");
      navigate("/waitingforquizmaster", { state: { roomCode: data.roomCode } });
    });
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
