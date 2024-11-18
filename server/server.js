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
    origin: "http://localhost:5173", // Frontend address
    methods: ["GET", "POST"],
  },
});

let rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Helper function to validate room code
  function validateRoomCode(roomCode, socket) {
    if (!rooms[roomCode]) {
      console.log(`Invalid room code: ${roomCode}`);
      socket.emit("error", "Invalid room code.");
      return false;
    }
    return true;
  }

  // Handle room creation
  socket.on('createRoom', ({ roomCode, settings }) => {
    if (!rooms[roomCode]) {
      const timeout = setTimeout(() => {
        if (rooms[roomCode]?.players.length === 1) {
          delete rooms[roomCode];
          io.to(roomCode).emit('roomClosed');
          console.log(`Room ${roomCode} auto-deleted due to inactivity.`);
        }
      }, 60000); // 1 minute

      rooms[roomCode] = {
        quizmaster: socket.id,
        settings,
        players: [{ id: socket.id, role: 'quizmaster' }],
        state: 'waiting',
        timeout,
      };
      socket.join(roomCode);
      io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);
      io.to(socket.id).emit('roomCreated', roomCode);
    } else {
      io.to(socket.id).emit('error', 'Room already exists.');
    }
  });

  // Handle joining a room
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

  // Handle starting the game
  socket.on('startGame', (roomCode) => {
    if (!validateRoomCode(roomCode, socket)) return;

    const room = rooms[roomCode];
    if (room && room.players.length === 2) {
      room.state = 'in-progress';
      console.log(`Game started in room ${roomCode}.`);
      room.players.forEach((player) => {
        console.log(`Assigning role: ${player.role} to socket ID: ${player.id}`);
        io.to(player.id).emit('roleAssigned', player.role);
      });
    } else {
      console.log(`Room ${roomCode} is not ready to start the game.`);
      socket.emit('error', 'Cannot start game. Room is not ready.');
    }
  });

  socket.on("startQuiz", (roomCode) => {
    const room = rooms[roomCode];
    if (room && room.players.length === 2) {
      console.log(`Quiz started for room ${roomCode}. Notifying players...`);
      room.players.forEach((player) => {
        if (player.role === "quizmaster") {
          console.log(`Redirecting quizmaster (socket ID: ${player.id}) to WaitingForPlayer.`);
          io.to(player.id).emit("navigateToWaitingForPlayer", { roomCode });
        } else if (player.role === "player") {
          console.log(`Redirecting player (socket ID: ${player.id}) to WaitingForQuizmaster.`);
          io.to(player.id).emit("navigateToWaitingForQuizmaster", { roomCode });
        }
      });
    } else {
      console.log(`Room ${roomCode} is not ready to start the quiz.`);
      socket.emit("error", "Room is not ready to start the quiz.");
    }
  });  

  // Handle player arrival at waiting page
  socket.on('arrivedAtWaitingPage', (roomCode) => {
    if (!validateRoomCode(roomCode, socket)) return;

    const room = rooms[roomCode];
    room.playersReady = (room.playersReady || 0) + 1;

    console.log(`Player (socket ID: ${socket.id}) arrived at waiting page for room ${roomCode}. Total ready: ${room.playersReady}`);

    if (room.playersReady === 2) {
      console.log(`Both players ready in room ${roomCode}. Emitting bothReady event.`);
      io.to(roomCode).emit('bothReady');
      room.playersReady = 0; // Reset for future interactions
    }
  });

  socket.on("quizmasterChoosing", (roomCode) => {
    const room = rooms[roomCode];
    if (room) {
      room.players.forEach((player) => {
        if (player.role === "player") {
          console.log(`Notifying player to navigate to WaitingQuestion.`);
          io.to(player.id).emit("navigateToWaitingQuestion", { roomCode });
        }
      });
    } else {
      console.log(`Room ${roomCode} not found.`);
    }
  });  
  
  
  // Handle disconnection
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
