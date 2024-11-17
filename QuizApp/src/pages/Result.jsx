import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { Link } from "react-router-dom";

function Result() {
  const socket = useSocket();
  const [score, setScore] = useState(null);

  useEffect(() => {
    socket.on("quizResults", (results) => {
      setScore(results.score);
    });

    return () => {
      socket.off("quizResults");
    };
  }, [socket]);

  return (
    <div className="result-container">
      {score !== null ? (
        <>
          <h1>Good job!</h1>
          <p>You scored {score}/5</p>
          <div className="play-again">
            <button type="button">
              <Link to="/">PLAY AGAIN</Link>
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
