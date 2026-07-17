module.exports = (io, socket) => {

    // ==========================================
    // Join Chat
    // ==========================================

    socket.on("join-chat", (chatId) => {

        socket.join(chatId);

        console.log(
            `${socket.userId} joined chat ${chatId}`
        );

    });

    // ==========================================
    // Leave Chat
    // ==========================================

    socket.on("leave-chat", (chatId) => {

        socket.leave(chatId);

        console.log(
            `${socket.userId} left chat ${chatId}`
        );

    });

    // ==========================================
    // Typing
    // ==========================================

    socket.on("typing", (chatId) => {

        socket.to(chatId).emit(
            "typing",
            socket.userId
        );

    });

    // ==========================================
    // Stop Typing
    // ==========================================

    socket.on("stop-typing", (chatId) => {

        socket.to(chatId).emit(
            "stop-typing",
            socket.userId
        );

    });

    // ==========================================
    // Delivered
    // ==========================================

    socket.on("delivered", ({ chatId, messageId }) => {

        socket.to(chatId).emit(
            "message-delivered",
            {
                chatId,
                messageId,
                userId: socket.userId,
            }
        );

    });

    // ==========================================
    // Seen
    // ==========================================

    socket.on("seen", ({ chatId }) => {

        socket.to(chatId).emit(
            "messages-seen",
            {
                chatId,
                userId: socket.userId,
            }
        );

    });

    // ==========================================
    // Notification
    // ==========================================

    socket.on("new-notification", (notification) => {

        io.to(notification.receiverId).emit(
            "new-notification",
            notification
        );

    });

    // ==========================================
    // Ping
    // ==========================================

    socket.on("ping", () => {

        socket.emit("pong");

    });

};