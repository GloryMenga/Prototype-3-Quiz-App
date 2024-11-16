import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import RolePicking from "./pages/RolePicking.jsx";
import PlayersWaiting from "./pages/PlayersWaiting.jsx";
import WaitingForPlayer from "./pages/WaitingForPlayer.jsx";
import WaitingForQuizmaster from "./pages/WaitingForQuizmaster.jsx";
import Questionchoosing from "./pages/Questionchoosing.jsx";
import './App.css';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/rolepicking" element={<RolePicking />} />
        <Route path="/playerswaiting" element={<PlayersWaiting />} />
        <Route path="/waitingforplayer" element={<WaitingForPlayer />} />
        <Route path="/waitingforquizmaster" element={<WaitingForQuizmaster />} />
        <Route path="/questionchoosing" element={<Questionchoosing />} />
      </Routes>
    </Router>
  )
}

export default App;
