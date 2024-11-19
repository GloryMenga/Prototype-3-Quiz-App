import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function PlayersWaiting() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode, isPlayer } = location.state || {};
  const [playerCount, setPlayerCount] = useState(1);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    // Handle initial room state
    socket.emit("getRoomState", roomCode);

    socket.on("playerJoined", (count) => {
      console.log("Player joined, count:", count);
      setPlayerCount(count);
      if (count === 2) {
        setShowStartButton(!isPlayer); // Only show for quizmaster
      }
    });

    socket.on("roomReady", () => {
      console.log("Room ready");
      setPlayerCount(2);
      setShowStartButton(!isPlayer); // Only show for quizmaster
    });

    socket.on("roomClosed", () => {
      alert("The room has been closed.");
      navigate("/");
    });

    socket.on("navigateToWaitingForPlayer", ({ roomCode }) => {
      console.log("Redirecting quizmaster to WaitingForPlayer");
      navigate("/waitingforplayer", { state: { roomCode } });
    });

    socket.on("navigateToWaitingForQuizmaster", ({ roomCode }) => {
      console.log("Redirecting player to WaitingForQuizmaster");
      navigate("/waitingforquizmaster", { state: { roomCode } });
    });

    return () => {
      socket.off("playerJoined");
      socket.off("roomReady");
      socket.off("roomClosed");
      socket.off("navigateToWaitingForPlayer");
      socket.off("navigateToWaitingForQuizmaster");
    };
  }, [socket, navigate, roomCode, isPlayer]);

  const handleStartGame = () => {
    if (!roomCode) {
      console.error("No room code available");
      return;
    }
    socket.emit("startQuiz", roomCode);
  };

  return (
    <div className="players-waiting-container">
      <h1>Room Code: {roomCode}</h1>
      <p>{playerCount}/2 players connected</p>
      {playerCount < 2 ? (
        <p>Waiting for players to join...</p>
      ) : (
        showStartButton && <button onClick={handleStartGame}>START GAME</button>
      )}
    </div>
  );
}

export default PlayersWaiting;