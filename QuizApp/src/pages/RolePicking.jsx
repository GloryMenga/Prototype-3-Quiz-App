import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import Controller from '../assets/controller.svg';
import Quizmaster from '../assets/quizmaster.svg';

function RolePicking() {
  const [selectedRole, setSelectedRole] = useState(null);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    socket.emit('selectRole', { role });
    socket.on('roleAssigned', (assignedRole) => {
      if (role === assignedRole) {
        setSelectedRole(role);
        const nextPage =
          role === 'quizmaster' ? '/waitingforplayer' : '/waitingforquizmaster';
        navigate(nextPage);
      }
    });

    socket.on('error', (message) => alert(message));
  };

  return (
    <div className="role-picking-container">
      <h1>Choose your role:</h1>
      <div className="role-picking-buttons">
        <div
          className={`role quizmaster ${selectedRole === 'quizmaster' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('quizmaster')}
        >
          <img src={Quizmaster} alt="Quizmaster" width="114px" height="114px" />
          <p className="role-text">Quizmaster</p>
        </div>

        <div
          className={`role player ${selectedRole === 'player' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('player')}
        >
          <img src={Controller} alt="Player" width="114px" height="114px" />
          <p className="role-text">Player</p>
        </div>
      </div>
    </div>
  );
}

export default RolePicking;
