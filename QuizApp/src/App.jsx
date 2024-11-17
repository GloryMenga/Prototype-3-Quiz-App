import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Home from "./pages/Home.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import RolePicking from "./pages/RolePicking.jsx";
import PlayersWaiting from "./pages/PlayersWaiting.jsx";
import WaitingForPlayer from "./pages/WaitingForPlayer.jsx";
import WaitingForQuizmaster from "./pages/WaitingForQuizmaster.jsx";
import Questionchoosing from "./pages/Questionchoosing.jsx";
import WaitingQuestion from "./pages/WaitingQuestion.jsx";
import Question from "./pages/Question.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import './App.css';

function App() {
  

  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/rolepicking" element={<RolePicking />} />
          <Route path="/playerswaiting" element={<PlayersWaiting />} />
          <Route path="/waitingforplayer" element={<WaitingForPlayer />} />
          <Route path="/waitingforquizmaster" element={<WaitingForQuizmaster />} />
          <Route path="/questionchoosing" element={<Questionchoosing />} />
          <Route path="/waitingquestion" element={<WaitingQuestion />} />
          <Route path="/question" element={<Question />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </SocketProvider>
  )
}

export default App;
