import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [code, setCode] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();
    // Pass default settings that will be updated in CreateRoom
    socket.emit("createRoom", { 
      roomCode, 
      settings: { 
        questions: 5, 
        timeLimit: 10 // Store as number
      } 
    });

    socket.once("roomCreated", () => {
      alert(`Room created! Your code is: ${roomCode}`);
      navigate("/createroom", { state: { roomCode } });
    });

    socket.once("error", (message) => {
      alert(message);
    });
  };

  const handleJoinRoom = () => {
    if (!code) {
      alert("Please enter a room code.");
      return;
    }
    socket.emit("joinRoom", code);

    socket.on("playerJoined", () => navigate("/playerswaiting"));
    socket.on("error", (message) => alert(message));
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <form>
        <input
          className="input-code"
          type="text"
          placeholder="Enter a room code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="create-room">
          <button type="button" onClick={handleCreateRoom}>
            CREATE A ROOM
          </button>
        </div>
        <div className="join-room">
          <button type="button" onClick={handleJoinRoom}>
            JOIN A ROOM
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
