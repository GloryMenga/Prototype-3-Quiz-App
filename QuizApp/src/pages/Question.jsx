import React from "react";

function Question(){
    return(
        <div className="quiz-container">
            <div className="question">
                <h1>Question 1</h1>
                <p>sdfsdq skqdjjh qsdfdqs fdsqf sqdf sqdf qs?...</p> {/* Dummy question */}
            </div>
            <div className="response">
                <h1>answer: </h1>
                <p>sdfsdq skqdjjh qsdfdqs fdsqf sqdf sqdf qs</p> {/* Dummy answer */}
            </div>
        </div>
    );
}

export default Question;