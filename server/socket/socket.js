const { Server } = require("socket.io");

let io;

// NEW
const onlineUsers = new Map();

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {

        console.log("Connected:", socket.id);

        // User setup
       socket.on("setup", (userId) => {

       socket.userId = userId; // Save on socket

       onlineUsers.set(userId, socket.id);
       socket.join(userId);
       io.emit("online-users", [...onlineUsers.keys()]);
       console.log("User Online:", userId);

});

    
        socket.on("disconnect", () => {

    if (socket.userId) {
        onlineUsers.delete(socket.userId);
        console.log("User Offline:", socket.userId);
    }
      io.emit("online-users", [...onlineUsers.keys()]);

    console.log("Disconnected:", socket.id);
     console.log(onlineUsers);

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