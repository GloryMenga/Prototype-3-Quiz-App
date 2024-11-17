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
    origin: "http://localhost:3000", // Frontend address
    methods: ["GET", "POST"]
  }
});

let rooms = {}; 

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('createRoom', ({ roomCode, settings }) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = {
        quizmaster: socket.id,
        settings,
        players: [],
        state: 'waiting',
      };
      socket.join(roomCode);
      io.to(socket.id).emit('roomCreated', roomCode);
      console.log(`Room ${roomCode} created.`);
    } else {
      io.to(socket.id).emit('error', 'Room already exists.');
    }
  });

  // Join a room
  socket.on('joinRoom', (roomCode) => {
    if (rooms[roomCode] && rooms[roomCode].players.length < 2) {
      rooms[roomCode].players.push(socket.id);
      socket.join(roomCode);
      io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);

      if (rooms[roomCode].players.length === 2) {
        io.to(roomCode).emit('roomReady');
      }
    } else {
      io.to(socket.id).emit('error', 'Room is full or does not exist.');
    }
  });

  // Handle role selection
  socket.on('selectRole', ({ roomCode, role }) => {
    const room = rooms[roomCode];
    if (room) {
      if (role === 'quizmaster' && room.quizmaster !== socket.id) {
        io.to(socket.id).emit('error', 'Quizmaster already selected.');
      } else {
        io.to(roomCode).emit('roleAssigned', role);
      }
    }
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    Object.keys(rooms).forEach((roomCode) => {
      if (rooms[roomCode].quizmaster === socket.id || rooms[roomCode].players.includes(socket.id)) {
        io.to(roomCode).emit('roomClosed');
        delete rooms[roomCode];
      }
    });
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
