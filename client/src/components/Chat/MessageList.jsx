import { useEffect, useRef, useState } from "react";

import MessageBubble from "./MessageBubble";
import { getMessages } from "../../services/messageAPI";
import { socket } from "../../services/socket";

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

    fetchMessages();
  }, [chat]);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await getMessages(chat._id);

      // Backend returns data
      setMessages(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
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

  // ===========================
  // Socket Listeners
  // ===========================

//   useEffect(() => {
//     if (!chat?._id) return;
// const handleReceiveMessage = (newMessage) => {
//   if (newMessage.chat !== chat._id) return;

//   setMessages((prev) => [...prev, newMessage]);
// };
//     const handleTyping = () => {
//       setTyping(true);
//     };

//     const handleStopTyping = () => {
//       setTyping(false);
//     };

//     socket.on("receive-message", handleReceiveMessage);

//     socket.on("typing", handleTyping);

//     socket.on("stop-typing", handleStopTyping);

//     return () => {
//       socket.off("receive-message", handleReceiveMessage);
//       socket.off("typing", handleTyping);
//       socket.off("stop-typing", handleStopTyping);
//     };
//   }, [chat]);

useEffect(() => {
  if (!chat?._id) return;

  const handleReceiveMessage = (msg) => {
    console.log("🔥 RECEIVE EVENT");
    console.log(msg);

    setMessages((prev) => [...prev, msg]);
  };

  socket.on("receive-message", handleReceiveMessage);

  return () => {
    socket.off("receive-message", handleReceiveMessage);
  };
}, [chat]);


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