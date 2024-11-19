import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function CreateRoom() {
  const [questions, setQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10);
  const [showDropdown, setShowDropdown] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode } = location.state;

  const handleSaveSettings = () => {
    const settings = {
      questions: questions,
      timeLimit: timeLimit
    };
    
    socket.emit("updateRoomSettings", { roomCode, settings });
    navigate("/playerswaiting", { state: { roomCode } });
  };

  const handleTimeSelect = (selectedTime) => {
    // Convert time string to number (e.g., "10 sec" -> 10)
    const timeValue = parseInt(selectedTime);
    setTimeLimit(timeValue);
    setShowDropdown(false);
  };

  return (
    <div className="createroom-container">
      <h1>Room Code: {roomCode}</h1>
      <h1 className="text">Set up your room settings:</h1>
      <p className="text">Choose the amount of questions:</p>
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
          {timeLimit} sec
        </div>
        {showDropdown && (
          <div className="dropdown">
            {[10, 15, 20].map((time) => (
              <div
                key={time}
                className="dropdown-item"
                onClick={() => handleTimeSelect(time)}
              >
                <span className={`dropdown-item-text ${timeLimit === time ? 'selected-text' : ''}`}>
                  {time} sec
                </span>
              </div>
            ))}
          </div>
        )}
      </label>
      <div className="btn">
        <button className="create-button" onClick={handleSaveSettings}>
          Save and Continue
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
