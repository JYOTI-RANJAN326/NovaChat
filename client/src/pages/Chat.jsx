import { useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Chat/Sidebar";
import ChatList from "../components/Chat/ChatList";
import ChatWindow from "../components/Chat/ChatWindow";

import useSocket from "../hooks/useSocket";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useSocket(user?._id);

  return (
    <div
      className="
      h-screen
      overflow-hidden
      bg-gradient-to-br
      from-[#030712]
      via-[#0B1120]
      to-[#111827]
      p-4
    "
    >
      {/* Ambient Glow */}

      <div className="pointer-events-none absolute left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[160px]" />

      <div
        className="
        relative
        flex
        h-full
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
        backdrop-blur-3xl
      "
      >
        {/* Sidebar */}

        <Sidebar />

        {/* Chat List */}

        <ChatList
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        {/* Chat Window */}

       <div className="flex flex-1 flex-col overflow-hidden bg-[#0B1120]/40">
  <ChatWindow selectedChat={selectedChat} />
</div>
      </div>
    </div>
  );
};

export default Chat;