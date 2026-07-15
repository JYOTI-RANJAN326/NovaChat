const express = require("express");
const http = require("http"); // adding for sockets.io
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const groupRoutes = require("./routes/group.routes");
const messageRoutes = require("./routes/message.routes");
const { initializeSocket } = require("./socket/socket");
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);// adding for sockets.io
initializeSocket(server); // for sockets.io
// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NovaChat AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server Running On ${PORT}`);

});








// NovaChat/
// │
// ├── client/
// │
// │   ├── public/
// │   │
// │   ├── src/
// │   │
// │   ├── assets/
// │   │   ├── images/
// │   │   ├── icons/
// │   │   ├── logo/
// │   │   ├── animations/
// │   │   └── sounds/
// │   │
// │   ├── components/
// │   │
// │   │   ├── common/
// │   │   │   ├── Background.jsx
// │   │   │   ├── Button.jsx
// │   │   │   ├── GlassCard.jsx
// │   │   │   ├── Input.jsx
// │   │   │   ├── Loader.jsx
// │   │   │   ├── Logo.jsx
// │   │   │   ├── SidebarLogo.jsx
// │   │   │   ├── Modal.jsx
// │   │   │   ├── Avatar.jsx
// │   │   │   ├── ProtectedRoute.jsx
// │   │   │   └── EmptyState.jsx
// │   │   │
// │   │   ├── auth/
// │   │   │   ├── AuthForm.jsx
// │   │   │   ├── LoginCard.jsx
// │   │   │   ├── SignupCard.jsx
// │   │   │   ├── LeftPanel.jsx
// │   │   │   ├── Divider.jsx
// │   │   │   ├── SocialButton.jsx
// │   │   │   └── OTPInput.jsx
// │   │   │
// │   │   ├── chat/
// │   │   │
// │   │   │   ├── sidebar/
// │   │   │   │   ├── Sidebar.jsx
// │   │   │   │   └── SidebarItem.jsx
// │   │   │   │
// │   │   │   ├── chatList/
// │   │   │   │   ├── ChatList.jsx
// │   │   │   │   ├── ChatItem.jsx
// │   │   │   │   └── SearchBar.jsx
// │   │   │   │
// │   │   │   ├── chatWindow/
// │   │   │   │   ├── ChatHeader.jsx
// │   │   │   │   ├── Messages.jsx
// │   │   │   │   ├── MessageBubble.jsx
// │   │   │   │   ├── MessageInput.jsx
// │   │   │   │   ├── ReplyPreview.jsx
// │   │   │   │   ├── TypingIndicator.jsx
// │   │   │   │   ├── SeenStatus.jsx
// │   │   │   │   ├── EmojiPicker.jsx
// │   │   │   │   └── AttachmentPreview.jsx
// │   │   │   │
// │   │   │   ├── groups/
// │   │   │   │   ├── GroupInfo.jsx
// │   │   │   │   ├── CreateGroup.jsx
// │   │   │   │   ├── AddMembers.jsx
// │   │   │   │   └── GroupMembers.jsx
// │   │   │   │
// │   │   │   ├── calls/
// │   │   │   │   ├── CallScreen.jsx
// │   │   │   │   ├── IncomingCall.jsx
// │   │   │   │   ├── VideoControls.jsx
// │   │   │   │   └── ScreenShare.jsx
// │   │   │   │
// │   │   │   └── ai/
// │   │   │       ├── AIPanel.jsx
// │   │   │       ├── AIChat.jsx
// │   │   │       ├── AIReply.jsx
// │   │   │       ├── Summarize.jsx
// │   │   │       ├── Translate.jsx
// │   │   │       └── GrammarFix.jsx
// │   │   │
// │   │   ├── profile/
// │   │   │   ├── ProfileCard.jsx
// │   │   │   ├── EditProfile.jsx
// │   │   │   └── UserInfo.jsx
// │   │   │
// │   │   └── settings/
// │   │       ├── SettingsPanel.jsx
// │   │       ├── ThemeToggle.jsx
// │   │       └── NotificationSettings.jsx
// │   │
// │   ├── layouts/
// │   │   ├── AuthLayout.jsx
// │   │   └── ChatLayout.jsx
// │   │
// │   ├── pages/
// │   │   ├── Home.jsx
// │   │   ├── Login.jsx
// │   │   ├── Signup.jsx
// │   │   ├── Chat.jsx
// │   │   ├── Profile.jsx
// │   │   ├── Settings.jsx
// │   │   ├── ForgotPassword.jsx
// │   │   ├── ResetPassword.jsx
// │   │   ├── VerifyOTP.jsx
// │   │   └── NotFound.jsx
// │   │
// │   ├── services/
// │   │   ├── apiConnector.js
// │   │   ├── authAPI.js
// │   │   ├── userAPI.js
// │   │   ├── chatAPI.js
// │   │   ├── messageAPI.js
// │   │   ├── groupAPI.js
// │   │   ├── aiAPI.js
// │   │   └── socket.js
// │   │
// │   ├── slices/
// │   │   ├── authSlice.js
// │   │   ├── userSlice.js
// │   │   ├── chatSlice.js
// │   │   ├── messageSlice.js
// │   │   ├── groupSlice.js
// │   │   ├── socketSlice.js
// │   │   ├── notificationSlice.js
// │   │   └── aiSlice.js
// │   │
// │   ├── store/
// │   │   └── store.js
// │   │
// │   ├── hooks/
// │   │   ├── useSocket.js
// │   │   ├── useAuth.js
// │   │   ├── useChat.js
// │   │   └── useDebounce.js
// │   │
// │   ├── utils/
// │   │   ├── constants.js
// │   │   ├── helpers.js
// │   │   ├── validators.js
// │   │   ├── theme.js
// │   │   └── formatTime.js
// │   │
// │   ├── App.jsx
// │   ├── main.jsx
// │   └── index.css
// │
// ├── server/
// │
// ├── .env
// ├── package.json
// └── README.md