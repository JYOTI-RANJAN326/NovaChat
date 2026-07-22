import { useRef, useState, useEffect } from "react";
import {
  FiSend,
  FiPaperclip,
  FiMic,
} from "react-icons/fi";
import {
  askAI,
  getChatHistory,
  clearChatHistory,
} from "../../services/aiAPI";
import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";

const AIChat = () => {
 const [messages, setMessages] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  useEffect(() => {
  const loadHistory = async () => {
    try {
      const res = await getChatHistory();

      if (
        res.data.success &&
        res.data.messages.length > 0
      ) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadHistory();
}, []);
const handleSend = async (customPrompt = null) => {
  const message = customPrompt || prompt;

  if (!message.trim() || loading) return;

  const userMessage = {
    role: "user",
    content: message,
  };

  const updatedMessages = [...messages, userMessage];

  setMessages(updatedMessages);

  if (!customPrompt) {
    setPrompt("");
  }

  setLoading(true);

  try {
    const res = await askAI(updatedMessages);

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: res.data.reply,
      },
    ]);
  } catch (err) {
    console.error(err);

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: "❌ Sorry, something went wrong.",
      },
    ]);
  }

  setLoading(false);
};
const clearChat = async () => {
  try {
    await clearChatHistory();

    setMessages([]);
  } catch (err) {
    console.error(err);
  }
};

const handleInput = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
  setPrompt(e.target.value);
};



  return (
   // <div className="flex h-full flex-col bg-[#0B1120]">
<div className="flex h-full min-h-0 flex-col   overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Header */}
<div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
  <div className="flex items-center justify-between px-6 py-4">

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl shadow-lg">
        🤖
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">
          Nova AI
        </h1>

        <p className="text-sm text-slate-400">
          Intelligent Coding Assistant
        </p>
      </div>

    </div>

    <button
      onClick={clearChat}
      className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-all hover:bg-red-500 hover:text-white"
    >
      🗑 Clear Chat
    </button>

  </div>
</div>{/* Messages */}
{/* Messages */}

 <div className="flex-1 min-h-0 overflow-y-auto px-6 py-8">

  {messages.length === 0 ? (
   <WelcomeScreen
  onSuggestion={(text) => handleSend(text)}
/>
  ) : (
    <div className="space-y-6">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          content={msg.content}
        />
      ))}
    </div>
  )}

  {loading && (
    <div className="mt-6 flex justify-start">
      <div className="rounded-2xl bg-white/5 px-5 py-3 text-slate-300 animate-pulse">
        🤖 Nova AI is thinking...
      </div>
    </div>
  )}

  <div ref={bottomRef} />

</div>

      {/* Input */}

 {/* Input */}
<div className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl p-5">

  <div className="mx-auto flex max-w-5xl items-end gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-xl">

    {/* Attachment */}
    <button
      className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-400"
      title="Coming Soon"
    >
      <FiPaperclip size={20} />
    </button>

    {/* Input */}
    <textarea
      rows={1}
      value={prompt}
     onChange={handleInput}
     style={{ height: "28px" }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      placeholder="Ask Nova anything..."
      className="
        max-h-40
        min-h-[28px]
        
        flex-1
        resize-none
        bg-transparent
        text-white
        placeholder:text-slate-500
        outline-none
      "
    />

    {/* Voice (future) */}
    <button
      className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-400"
      title="Coming Soon"
    >
      <FiMic size={20} />
    </button>

    {/* Send */}
    <button
      onClick={handleSend}
      disabled={loading || !prompt.trim()}
      className="
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        p-3
        text-white
        shadow-lg
        transition-all
        hover:scale-105
        hover:shadow-cyan-500/30
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      <FiSend size={23} />
    </button>

  </div>

</div>

    </div>
  );
};

export default AIChat;