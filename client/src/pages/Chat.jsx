import { useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Chat/Sidebar";
import ChatList from "../components/Chat/ChatList";
import ChatWindow from "../components/Chat/ChatWindow";

import AIChat from "../components/AI/AIChat";
import PDFChat from "../components/AI/PDFChat";
import CodeReviewer from "../components/AI/CodeReviewer";
import AIToolsSidebar from "../components/AI/AIToolsSidebar";
import WebSearch from "../components/AI/WebSearch";
import useSocket from "../hooks/useSocket";
import ImageAnalysis from "../components/AI/ImageAnalysis";
const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeSection, setActiveSection] = useState("Chats");
  const [activeTool, setActiveTool] = useState(null);

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
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[160px]" />

      {/* Main Layout */}
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
        {/* Left Sidebar */}
       {/* Left Sidebar */}
<div
  className={`
    flex
    h-full
    flex-shrink-0
    overflow-hidden

    ${
      activeSection === "AI Assistant"
        ? ""
        : selectedChat
        ? "hidden lg:flex"
        : "flex"
    }
  `}
>

  {/* Main Navigation Sidebar */}
  <Sidebar
    activeSection={activeSection}
    setActiveSection={setActiveSection}
/>

  {/* Second Sidebar */}
   {activeSection === "AI Assistant" ? (
    <AIToolsSidebar
      activeTool={activeTool}
      setActiveTool={setActiveTool}
    />

  ) : (
    <ChatList
      className="w-[340px] px-4 py-10"
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      activeSection={activeSection}
    />
  )}

</div>

{/* Right Side */}
{/* Right Side */}
<div
  className={`
    flex
    flex-1
    flex-col
    overflow-hidden
    bg-[#0B1120]/40

    ${
      activeSection === "AI Assistant"
        ? "flex"
        : selectedChat
        ? "flex"
        : "hidden lg:flex"
    }
  `}
>{activeSection === "AI Assistant" ? (

 <main
  className={`
    flex
    flex-1
    min-h-0
    flex-col
    bg-[#0B1120]
    p-6

    ${
      activeTool
        ? "flex"
        : "hidden lg:flex"
    }
  `}
>

    <div
      className="
        flex
        h-full
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        shadow-2xl
      "
    >
     {activeTool === "chat" && (
  <AIChat setActiveTool={setActiveTool} />
)}
      {activeTool === "pdf" && (<PDFChat setActiveTool={setActiveTool} />
)}
      {activeTool === "code" && (<CodeReviewer setActiveTool={setActiveTool} />)}

     {activeTool === "image" && (
  <ImageAnalysis setActiveTool={setActiveTool} />
)}

{activeTool === "web" && (
  <WebSearch setActiveTool={setActiveTool} />
)}
    </div>

  </main>

) :  selectedChat ? (

            <ChatWindow
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />

          ) : (

            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">
                  Welcome to NovaChat 👋
                </h2>

                <p className="mt-3 text-slate-400">
                  Select a conversation to start chatting.
                </p>
              </div>
            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default Chat;