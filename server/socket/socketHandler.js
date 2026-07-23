

const User = require("../models/User");

const socketEvents = require("./socketEvents");

const usersInCall = new Set();
module.exports = (io, socket, onlineUsers) => {

    console.log("Connected:", socket.id);

    // ==================================
    // User Setup
    // ==================================

    socket.on("setup", async (userId) => {

        socket.userId = userId;

        // Disconnect previous socket if user logs in again
        const previousSocketId = onlineUsers.get(userId);

        if (
            previousSocketId &&
            previousSocketId !== socket.id
        ) {
            const previousSocket =
                io.sockets.sockets.get(previousSocketId);

            if (previousSocket) {
                previousSocket.disconnect(true);
            }
        }

       onlineUsers.set(userId, socket.id);

socket.join(userId);

// Update DB
await User.findByIdAndUpdate(userId, {
    isOnline: true,
});

io.emit("online-users", [...onlineUsers.keys()]);

io.emit("user-online", {
    userId,
});

console.log("User Online:", userId);

    });

    
    // ==================================
    // Register Chat Events
    // ==================================

    socketEvents(io, socket);

    // ==================================
    // Voice Call
    // ==================================

    

socket.on("call-user", (data) => {
    console.log("call-user", data);
  const receiverSocketId = onlineUsers.get(data.receiverId);

  if (!receiverSocketId) {
    socket.emit("call-rejected", {
      reason: "offline",
    });
    return;
  }

  // User is already in another call
  if (usersInCall.has(data.receiverId)) {
    socket.emit("user-busy");
    return;
  }

  io.to(receiverSocketId).emit("incoming-call", {
    callerId: data.callerId,
    callerName: data.callerName,
    callType: data.callType || "audio",
  });
});
    // ==================================
    // WebRTC Signalling
    // ==================================

    socket.on("webrtc-signal", (data) => {
        console.log(
    "Signal:",
    data.signal.type
);

        const receiverSocketId =
            onlineUsers.get(data.receiverId);

        if (!receiverSocketId) return;

        io.to(receiverSocketId).emit(
            "webrtc-signal",
            {
                signal: data.signal,
                senderId: socket.userId,
            }
        );

    });

    socket.on("accept-call", (data) => {
        console.log("accept-call received", data);
        usersInCall.add(data.callerId);
        usersInCall.add(data.receiverId);
        const callerSocketId =
            onlineUsers.get(data.callerId);

        if (!callerSocketId) return;
        console.log(
    "Emitting call-accepted to",
    callerSocketId
);

        io.to(callerSocketId).emit(
            "call-accepted",
            {
                receiverId: data.receiverId,
            }
        );

    });

    socket.on("reject-call", (data) => {

        const callerSocketId =
            onlineUsers.get(data.callerId);

        if (!callerSocketId) return;

        io.to(callerSocketId).emit(
            "call-rejected"
        );

    });

    socket.on("end-call", (data) => {
        usersInCall.delete(socket.userId);
        usersInCall.delete(data.receiverId);
        const receiverSocketId =
            onlineUsers.get(data.receiverId);

        if (!receiverSocketId) return;

        io.to(receiverSocketId).emit(
    "call-ended",
    {
        senderId: socket.userId,
    }
);

    });

    // ==================================
    // Disconnect
    // ==================================

    socket.on("disconnect", async () => {

       if (socket.userId) {
         usersInCall.delete(socket.userId);

//     socket.broadcast.emit("call-ended", {
//     senderId: socket.userId,
//   });

    if (
        onlineUsers.get(socket.userId) === socket.id
    ) {
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

    io.emit(
        "online-users",
        [...onlineUsers.keys()]
    );

    console.log(
        "User Offline:",
        socket.userId
    );
}

        console.log("Disconnected:", socket.id);

    });

};