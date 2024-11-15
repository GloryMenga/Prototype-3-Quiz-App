import React from 'react';

function RolePicking() {

  return (
    <div className="role-picking-container">
      <h1>Choose your role:</h1>
      <div className="role-picking-buttons">
        <div
          className="role quizmaster"
        >
          <p className="role-text">Quizmaster</p>
        </div>

        <div
          className="role player"
        >
          <p className="role-text">Player</p>
        </div>
      </div>
    </div>
  );
}

export default RolePicking;