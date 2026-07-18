import { useEffect, useRef, useState } from "react";

import MessageBubble from "./MessageBubble";
import { getMessages } from "../../services/messageAPI";
import { socket } from "../../services/socket";
//import { apiConnector } from "../../services/apiConnector";

const MessageList = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
 const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // ===========================
  // Fetch Messages
  // ===========================


  useEffect(() => {
  if (!chat?._id) return;

  setMessages([]);
  fetchMessages();
}, [chat?._id]);

useEffect(() => {
  if (!chat?._id) return;

  socket.emit("join-chat", chat._id);

  return () => {
    socket.emit("leave-chat", chat._id);
  };
}, [chat?._id]);


 const fetchMessages = async () => {
  try {
    console.log("Chat:", chat);

    setLoading(true);

    const response = await getMessages(chat._id);

    console.log("Response:", response);

    setMessages(response.data || []);
  } catch (error) {
    console.log("ERROR:", error);
    console.log("Response:", error.response);
  } finally {
    console.log("Finished");
    setLoading(false);
  }
};

  // ===========================
  // Auto Scroll
  // ===========================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

 useEffect(() => {
  if (!chat?._id) return;

  const handleReceiveMessage = (msg) => {
    const messageChatId =
  typeof msg.chat === "object" ? msg.chat._id : msg.chat;

if (messageChatId !== chat._id) return;

    setMessages((prev) => {
      const exists = prev.some((m) => m._id === msg._id);

      if (exists) return prev;

      return [...prev, msg];
    });
  };
  const handleEditedMessage = (updatedMessage) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg._id === updatedMessage._id ? updatedMessage : msg
    )
  );
};

 const handleTyping = ({ chatId }) => {
  if (chatId !== chat._id) return;

  setTyping(true);
};

 const handleStopTyping = ({ chatId }) => {
  if (chatId !== chat._id) return;

  setTyping(false);
};

  socket.on("receive-message", handleReceiveMessage);
socket.on("message-edited", handleEditedMessage);
socket.on("typing", handleTyping);
socket.on("stop-typing", handleStopTyping);

  return () => {
    socket.off("receive-message", handleReceiveMessage);
     socket.off("message-edited", handleEditedMessage);
    socket.off("typing", handleTyping);
    socket.off("stop-typing", handleStopTyping);
  };
}, [chat?._id]);


  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#08111F]">
        <p className="text-slate-400">
          Loading messages...
        </p>
      </div>
    );
  }

  // ===========================
  // Empty Chat
  // ===========================

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#08111F]">
        <p className="text-slate-500">
          No messages yet. Start the conversation 👋
        </p>
      </div>
    );
  }

  // ===========================
  // UI
  // ===========================

  return (
  <div
  className="
    h-full
    overflow-y-auto
    overflow-x-hidden
    px-8
    py-6
    relative
    z-10
  "
>
      {messages.map((message) => (
  <MessageBubble
    key={message._id}
    message={message}
    refreshMessages={fetchMessages}
  />
))}

      {typing && (
        <div className="mb-3 ml-2 text-sm italic text-cyan-400">
          Typing...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;