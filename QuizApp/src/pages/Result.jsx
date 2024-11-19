import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    const stateScore = location.state?.score ?? 0;
    const stateTotalQuestions = location.state?.totalQuestions ?? 0;

    setScore(stateScore);
    setTotalQuestions(stateTotalQuestions);

    socket.on("quizResults", (results) => {
      setScore(results.score);
      setTotalQuestions(results.totalQuestions);
    });

    return () => {
      socket.off("quizResults");
    };
  }, [socket, location.state, navigate]);

  const handlePlayAgain = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      {score !== null && totalQuestions !== null ? (
        <>
          <h1>Quiz Complete!</h1>
          <p>Score: {score}/{totalQuestions}</p>
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
