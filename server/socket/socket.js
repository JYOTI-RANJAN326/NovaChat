const { Server } = require("socket.io");
const User = require("../models/User");
const socketHandler = require("./socketHandler");

let io;

const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
       origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

 io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socketHandler(io, socket, onlineUsers);

  socket.on("register-user", async (userId) => {
    socket.userId = userId;

    onlineUsers.set(userId, socket.id);

    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });

    io.emit("user-online", userId);

    console.log(`${userId} is online`);
  });

  socket.on("disconnect", async () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);

      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      io.emit("user-offline", {
        userId: socket.userId,
        lastSeen: new Date(),
      });
    }

    console.log("🔴 User Disconnected:", socket.id);
  });
});
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
  onlineUsers,
};