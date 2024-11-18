import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Result() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [score, setScore] = useState(null);

  useEffect(() => {
    socket.on("quizResults", (results) => {
      setScore(results.score);
    });

    return () => {
      socket.off("quizResults");
    };
  }, [socket]);

  const handlePlayAgain = () => {
    // Emit event to reset game or return to initial setup
    socket.emit("resetGame");
    navigate("/");
  };

  return (
    <div className="result-container">
      {score !== null ? (
        <>
          <h1>Good job!</h1>
          <p>You scored {score}/5</p>
          <div className="play-again">
            <button type="button" onClick={handlePlayAgain}>
              PLAY AGAIN
            </button>
          </div>
        </>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
}

export default Result;