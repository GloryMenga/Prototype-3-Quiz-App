import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

function Question() {
  const socket = useSocket();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    socket.on("questionSelected", (q) => {
      setQuestion(q); // Set the question when received
    });

    return () => {
      socket.off("questionSelected");
    };
  }, [socket]);

  return (
    <div className="quiz-container">
      {question ? (
        <>
          <div className="question">
            <h1>{question.title}</h1>
            <p>{question.text}</p>
          </div>
          <div className="response">
            <h1>Answer:</h1>
            <p>{question.answer}</p>
          </div>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default Question;
