import React, { useState, useEffect } from "react";


function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); 
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setProgress((prevProgress) => prevProgress - 10); 
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const answers = ["iPhondsqdsfsqdf dsf qdfsd fdsqf fsdqe", "iPad", "Apple I", "iPod"]; {/* Dummy answer */}

  return (
    <div className="quiz-container">
      <div className="question">
        <h1>Question 1</h1>
        <p>What was Apple's first product?</p>
      </div>
      
      {/* Timer */}
      <div className="timer">
        <div className="timer-track">
          <div className="timer-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="answer-options">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${selectedAnswer === index ? "selected" : ""}`}
            onClick={() => setSelectedAnswer(index)}
          >
            {answer}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="next">
        <button
          type="button"
          disabled={selectedAnswer === null} 
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
