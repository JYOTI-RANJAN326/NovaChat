



const socketEvents = require("./socketEvents");

module.exports = (io, socket, onlineUsers) => {

    console.log("Connected:", socket.id);

    // ==================================
    // User Setup
    // ==================================

    socket.on("setup", (userId) => {

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

        io.emit(
            "online-users",
            [...onlineUsers.keys()]
        );

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

        const receiverSocketId =
            onlineUsers.get(data.receiverId);

        if (!receiverSocketId) return;

        io.to(receiverSocketId).emit(
            "incoming-call",
            {
                callerId: data.callerId,
                callerName: data.callerName,
            }
        );

    });

    // ==================================
    // WebRTC Signalling
    // ==================================

    socket.on("webrtc-signal", (data) => {

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

        const callerSocketId =
            onlineUsers.get(data.callerId);

        if (!callerSocketId) return;

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

        const receiverSocketId =
            onlineUsers.get(data.receiverId);

        if (!receiverSocketId) return;

        io.to(receiverSocketId).emit(
            "call-ended"
        );

    });

    // ==================================
    // Disconnect
    // ==================================

    socket.on("disconnect", () => {

        if (socket.userId) {

            // Remove only if this socket is the active socket
            if (
                onlineUsers.get(socket.userId) === socket.id
            ) {
                onlineUsers.delete(socket.userId);
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