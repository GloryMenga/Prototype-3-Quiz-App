import React from 'react';

function PlayersWaiting() {
  return (
    <div className="players-waiting-container">
      <p className="players-waiting-text">1 Player remaining . . .</p>
      {/* Player count */}
      <p className="players-waiting-count">1/2 players</p>
    </div>
  );
}

export default PlayersWaiting;