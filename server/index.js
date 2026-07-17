const express = require("express");
const http = require("http"); // adding for sockets.io
 require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const groupRoutes = require("./routes/group.routes");
const messageRoutes = require("./routes/message.routes");
const { initializeSocket } = require("./socket/socket");
const errorHandler = require("./middlewares/error.middleware");
const uploadRoutes = require("./routes/upload.routes");

connectDB();

const app = express();
const server = http.createServer(app);// adding for sockets.io
initializeSocket(server); // for sockets.io
// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/upload", uploadRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/messages", messageRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NovaChat AI Backend Running 🚀",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server Running On ${PORT}`);

});







