const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

let rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  function validateRoomCode(roomCode, socket) {
    if (!rooms[roomCode]) {
      console.log(`Invalid room code: ${roomCode}`);
      socket.emit("error", "Invalid room code.");
      return false;
    }
    return true;
  }

  socket.on('createRoom', ({ roomCode, settings }) => {
    if (!rooms[roomCode]) {
      const timeout = setTimeout(() => {
        if (rooms[roomCode]?.players.length === 1) {
          delete rooms[roomCode];
          io.to(roomCode).emit('roomClosed');
          console.log(`Room ${roomCode} auto-deleted due to inactivity.`);
        }
      }, 60000);

      rooms[roomCode] = {
        quizmaster: socket.id,
        settings: {
          questions: parseInt(settings.questions),
          timeLimit: parseInt(settings.timeLimit),
        },
        players: [{ id: socket.id, role: 'quizmaster' }],
        state: 'waiting',
        timeout,
        currentQuestionCount: 0,
      };
      
      socket.join(roomCode);
      io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);
      io.to(socket.id).emit('roomCreated', roomCode);
    } else {
      io.to(socket.id).emit('error', 'Room already exists.');
    }
  });

  socket.on('updateRoomSettings', ({ roomCode, settings }) => {
    if (rooms[roomCode]) {
      rooms[roomCode].settings = {
        questions: parseInt(settings.questions),
        timeLimit: parseInt(settings.timeLimit),
      };
      io.to(roomCode).emit('settingsUpdated', rooms[roomCode].settings);
    }
  });

  socket.on('joinRoom', (roomCode) => {
    const room = rooms[roomCode];
    if (room && room.players.length < 2) {
      room.players.push({ id: socket.id, role: 'player' });
      socket.join(roomCode);
      io.to(roomCode).emit('playerJoined', room.players.length);

      if (room.players.length === 2) {
        io.to(roomCode).emit('roomReady');
      }
    } else {
      socket.emit('error', 'Room is full or does not exist.');
    }
  });

  socket.on('startGame', (roomCode) => {
    if (!validateRoomCode(roomCode, socket)) return;

    const room = rooms[roomCode];
    if (room && room.players.length === 2) {
      room.state = 'in-progress';
      console.log(`Game started in room ${roomCode}.`);
      room.players.forEach((player) => {
        io.to(player.id).emit('roleAssigned', player.role);
      });
    } else {
      socket.emit('error', 'Cannot start game. Room is not ready.');
    }
  });

  socket.on("startQuiz", (roomCode) => {
    const room = rooms[roomCode];
    if (room && room.players.length === 2) {
      console.log(`Quiz started for room ${roomCode}. Notifying players...`);
      room.players.forEach((player) => {
        if (player.role === "quizmaster") {
          io.to(player.id).emit("navigateToWaitingForPlayer", { roomCode });
        } else if (player.role === "player") {
          io.to(player.id).emit("navigateToWaitingForQuizmaster", { roomCode });
        }
      });
    } else {
      socket.emit("error", "Player 2 is ready");
    }
  });

  socket.on('arrivedAtWaitingPage', (roomCode) => {
    if (!validateRoomCode(roomCode, socket)) return;

    const room = rooms[roomCode];
    room.playersReady = (room.playersReady || 0) + 1;

    if (room.playersReady === 2) {
      io.to(roomCode).emit('bothReady');
      room.playersReady = 0;
    }
  });

  socket.on("quizmasterChoosing", (roomCode) => {
    console.log("Quizmaster choosing question for room:", roomCode);
    const room = rooms[roomCode];
    if (room) {
      room.players.forEach((player) => {
        if (player.role === "player") {
          io.to(player.id).emit("navigateToWaitingQuestion", { roomCode });
        }
      });
    }
  });

  socket.on("questionSelected", (questionData) => {
    const { roomCode, ...question } = questionData;
    
    if (roomCode && rooms[roomCode]) {
      rooms[roomCode].currentQuestion = question;
      rooms[roomCode].currentQuestionCount++;
      
      io.to(roomCode).emit("questionSelected", {
        ...question,
        timeLimit: rooms[roomCode].settings.timeLimit,
        currentQuestion: rooms[roomCode].currentQuestionCount,
        totalQuestions: rooms[roomCode].settings.questions,
        roomCode
      });
    }
  });
  

  socket.on("answerSubmitted", ({ questionId, answer, roomCode }) => {
    const room = rooms[roomCode];
    if (room && room.currentQuestion) {
      const isCorrect = answer === room.currentQuestion.answer;
  
      room.players.forEach((player) => {
        if (player.role === "quizmaster") {
          io.to(player.id).emit("answerSubmitted", {
            questionId,
            playerAnswer: answer || "No answer submitted",
            isCorrect,
            roomCode
          });
        }
      });
  
      if (isCorrect) {
        room.playerScore = (room.playerScore || 0) + 1;
      }
    }
  });
  
  socket.on("endTurn", ({ currentLap, roomCode }) => {
    const room = rooms[roomCode];
  
    if (room) {
      if (room.currentQuestionCount >= room.settings.questions) {
        io.to(roomCode).emit("quizResults", {
          score: room.playerScore || 0,
          totalQuestions: room.settings.questions,
          roomCode,
        });
  
        room.players.forEach((player) => {
          io.to(player.id).emit("navigateToResults", {
            score: room.playerScore || 0,
            totalQuestions: room.settings.questions,
            roomCode,
          });
        });
      } else {
        io.to(roomCode).emit("turnEnded", {
          roomCode,
          currentQuestion: room.currentQuestionCount,
          totalQuestions: room.settings.questions,
        });
      }
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    Object.keys(rooms).forEach((roomCode) => {
      const room = rooms[roomCode];
      const playerIndex = room.players.findIndex((p) => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        if (room.players.length === 0) {
          clearTimeout(room.timeout);
          delete rooms[roomCode];
          io.to(roomCode).emit('roomClosed');
        } else {
          io.to(roomCode).emit('playerLeft', room.players.length);
        }
      }
    });
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
