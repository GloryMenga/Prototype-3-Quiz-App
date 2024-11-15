import React from "react";

function Home() {

  return (
    <>
     <div className="home-container">
      <h1>Fill in the code:</h1>
      <form>
        <input className="input-code" type="text"  placeholder="Code" />
        <div className="create-room">
          <button type="button">CREATE A ROOM</button>
        </div>
        <div className="join-room">
          <button type="button">JOIN A ROOM</button>
        </div>
      </form>
     </div>
    </>
  );
}

export default Home;