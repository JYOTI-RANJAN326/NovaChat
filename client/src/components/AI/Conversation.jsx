import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

export default function Conversation({
  messages,
  loading = false,
  loadingText = "Thinking...",
}) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      block: "end",
    });
  };

  const handleScroll = () => {
    const el = containerRef.current;

    if (!el) return;

    const threshold = 80;

    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, loading]);

  return (
    <div className="relative h-full">

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-6 py-6"
      >
        <div className="space-y-5">

          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {loading && (
            <MessageBubble
              role="assistant"
              content={loadingText}
            />
          )}

          <div ref={bottomRef} />

        </div>
      </div>

      {!isAtBottom && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-6 right-6 rounded-full bg-cyan-500 px-4 py-2 text-white shadow-lg hover:bg-cyan-400"
        >
          ↓ New Messages
        </button>
      )}

    </div>
  );
}