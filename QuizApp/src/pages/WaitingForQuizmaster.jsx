import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

function WaitingForQuizmaster() {
  const socket = useSocket();
  const [quizmasterJoined, setQuizmasterJoined] = useState(false);

  useEffect(() => {
    socket.on("quizmasterJoined", () => {
      setQuizmasterJoined(true);
    });

    return () => {
      socket.off("quizmasterJoined");
    };
  }, [socket]);

  return (
    <div className="waiting-for-quizmaster-container">
      <p className="waiting-for-quizmaster-text">Waiting for a quizmaster...</p>
      <p className="waiting-for-quizmaster-role">
        {quizmasterJoined ? "1/1 Quizmaster" : "0/1 Quizmaster"}
      </p>
      <p className="waiting-for-quizmaster-role">1/1 Player</p>
    </div>
  );
}

export default WaitingForQuizmaster;
