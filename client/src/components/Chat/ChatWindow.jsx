import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMessageCircle,
  FiArrowLeft,
} from "react-icons/fi";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { socket } from "../../services/socket";

const ChatWindow = ({ selectedChat }) => {
useEffect(() => {
  if (!selectedChat?._id) return;

  const chatId = selectedChat._id;

  socket.emit("join-chat", chatId);

  return () => {
    socket.emit("leave-chat", chatId);
  };
}, [selectedChat?._id]);

  // Empty State
  if (!selectedChat) {
    return (
      <div
        className="
        relative
        flex
        flex-1
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-[#030712]
        via-[#0B1120]
        to-[#111827]
      "
      >
        {/* Glow */}

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[180px]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            text-center
          "
        >
          <div
            className="
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            shadow-[0_0_40px_rgba(34,211,238,.35)]
          "
          >
            <FiMessageCircle className="text-5xl text-white" />
          </div>

          <h1 className="mt-8 text-5xl font-bold text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NovaChat
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-slate-400">
            Select a conversation from the left panel
            or create a new chat to start messaging.
          </p>

          <div
            className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-6
            py-3
            text-cyan-300
          "
          >
            <FiArrowLeft />
            Choose a conversation
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="
      relative
      flex
      flex-1
      flex-col
      overflow-hidden
      bg-gradient-to-br
      from-[#030712]
      via-[#0B1120]
      to-[#111827]
    "
    >
      {/* Ambient Glow */}

      <div className="pointer-events-none absolute left-10 top-10 h-60 w-60 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/5 blur-[150px]" />

      {/* Header */}

      <div className="relative z-20">
        <ChatHeader chat={selectedChat} />
      </div>

      {/* Messages */}

     <motion.div
  key={selectedChat._id}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
  className="
    relative
    z-10
    flex-1
    overflow-hidden
  "
>
<MessageList chat={selectedChat} />
</motion.div>

      {/* Input */}

      <div className="relative z-15">
       <MessageInput chatId={selectedChat._id} />
      </div>
    </div>
  );
};

export default ChatWindow;