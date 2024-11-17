import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function CreateRoom() {
  const [questions, setQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState("10 sec");
  const [showDropdown, setShowDropdown] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state; // Get room code from Home

  const handleSaveSettings = () => {
    const settings = { questions, timeLimit };
    socket.emit("updateRoomSettings", { roomCode, settings }); // Update settings on the server

    // Navigate to PlayersWaiting
    navigate("/playerswaiting", { state: { roomCode } });
  };

  const handleTimeSelect = (selectedTime) => {
    setTimeLimit(selectedTime);
    setShowDropdown(false);
  };

  return (
    <div className="createroom-container">
      <h1>Room Code: {roomCode}</h1>
      <p className="text">Set up your room settings:</p>
      <label className="slider-container">
        <input
          type="range"
          min="1"
          max="5"
          value={questions}
          onChange={(e) => setQuestions(Number(e.target.value))}
        />
        <span className="value-text">{questions}</span>
      </label>
      <label className="time">
        <p className="text">Time Limit per Question:</p>
        <div className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
          {timeLimit}
        </div>
        {showDropdown && (
          <div className="dropdown">
            {['10 sec', '15 sec', '20 sec'].map((time) => (
              <div
                key={time}
                className="dropdown-item"
                onClick={() => handleTimeSelect(time)}
              >
                <span
                  className={`dropdown-item-text ${
                    timeLimit === time ? 'selected-text' : ''
                  }`}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        )}
      </label>
      <div className="btn">
        <button className="create-button" onClick={handleSaveSettings}>Save and Continue</button>
      </div>
    </div>
  );
}

export default CreateRoom;
