import React, { useState } from 'react';

function CreateRoom() {
  const [questions, setQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState('10 sec');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTimeSelect = (selectedTime) => {
    setTimeLimit(selectedTime);
    setShowDropdown(false);
  };

  return (
    <div className="createroom-container">
      <p className="text">How many questions:</p>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={questions}
          onChange={(e) => setQuestions(Number(e.target.value))}
          className="slider"
        />
        <span className="value-text">{questions}</span>
      </div>

      <div className="difficulty">
        <p className="text">Select the difficulty:</p>
        <div className="difficulty-selector">
          {['easy', 'medium', 'hard'].map((level) => (
            <div
              key={level}
              className={`difficulty-option ${
                difficulty === level ? 'selected' : ''
              }`}
              onClick={() => setDifficulty(level)}
            >
              <span className="difficulty-text">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="time">
        <p className="text">Time Limit per Question:</p>
        <div
          className="dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
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
      </div>

      <div className="btn">
        <button
          className="create-button"
        >
          CREATE ROOM
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;