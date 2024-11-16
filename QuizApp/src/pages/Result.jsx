import React from "react";
import { Link } from "react-router-dom";

function Result(){
    return(
        <div className="result-container">
            <h1>Good job!</h1>
            <p>You had 3/5 right</p>
            <div className="play-again">
                <button type="button"> <Link to="/">PLAY AGAIN</Link></button>
            </div>
        </div>
    );

}

export default Result;