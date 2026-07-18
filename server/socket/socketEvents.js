


module.exports = (io, socket) => {

    // ==========================================
    // Join Chat
    // ==========================================

    socket.on("join-chat", (chatId) => {

        if (!chatId) return;

        socket.join(chatId);

        console.log(`${socket.userId} joined chat ${chatId}`);

    });

    // ==========================================
    // Leave Chat
    // ==========================================

    socket.on("leave-chat", (chatId) => {

        if (!chatId) return;

        socket.leave(chatId);

        console.log(`${socket.userId} left chat ${chatId}`);

    });

    // ==========================================
    // Typing
    // ==========================================

    socket.on("typing", ({ chatId }) => {

        if (!chatId) return;

        socket.to(chatId).emit("typing", {
            chatId,
            userId: socket.userId,
        });

    });

    // ==========================================
    // Stop Typing
    // ==========================================

    socket.on("stop-typing", ({ chatId }) => {

        if (!chatId) return;

        socket.to(chatId).emit("stop-typing", {
            chatId,
            userId: socket.userId,
        });

    });

    // ==========================================
    // Message Delivered
    // ==========================================

    socket.on("delivered", ({ chatId, messageId }) => {

        if (!chatId || !messageId) return;

        socket.to(chatId).emit("message-delivered", {
            chatId,
            messageId,
            userId: socket.userId,
        });

    });

    // ==========================================
    // Messages Seen
    // ==========================================

    socket.on("seen", ({ chatId, messageIds = [] }) => {

        if (!chatId) return;

        socket.to(chatId).emit("messages-seen", {
            chatId,
            messageIds,
            userId: socket.userId,
            seenAt: new Date(),
        });

    });

    // ==========================================
    // Notification
    // ==========================================

    socket.on("new-notification", (notification) => {

        if (!notification?.receiverId) return;

        io.to(notification.receiverId).emit(
            "new-notification",
            notification
        );

    });

    // ==========================================
    // Ping / Pong (Heartbeat)
    // ==========================================

    socket.on("ping", () => {

        socket.emit("pong", {
            timestamp: Date.now(),
        });

    });

};
