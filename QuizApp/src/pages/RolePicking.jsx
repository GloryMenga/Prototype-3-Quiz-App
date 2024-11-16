import React from 'react';
import Controller from '../assets/controller.svg';
import Quizmaster from '../assets/quizmaster.svg';

function RolePicking() {

  return (
    <div className="role-picking-container">
      <h1>Choose your role:</h1>
      <div className="role-picking-buttons">
        <div
          className="role quizmaster"
        >
          <img src={Quizmaster} alt="Quizmaster" width="114px" height="114px"/>
          <p className="role-text">Quizmaster</p>
        </div>

        <div
          className="role player"
        >
          <img src={Controller} alt="Controller" width="114px" height="114px"/>
          <p className="role-text">Player</p>
        </div>
      </div>
    </div>
  );
}

export default RolePicking;