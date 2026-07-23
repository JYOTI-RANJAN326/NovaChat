// import { useEffect, useRef, useState } from "react";
// import MessageBubble from "./MessageBubble";

// export default function Conversation({
//   messages,
//   loading = false,
//   loadingText = "Thinking...",
// }) {
//   const containerRef = useRef(null);
//   const bottomRef = useRef(null);

//   const [isAtBottom, setIsAtBottom] = useState(true);

//   const scrollToBottom = (smooth = true) => {
//     bottomRef.current?.scrollIntoView({
//       behavior: smooth ? "smooth" : "instant",
//       block: "end",
//     });
//   };

//   const handleScroll = () => {
//     const el = containerRef.current;

//     if (!el) return;

//     const threshold = 80;

//     const atBottom =
//       el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

//     setIsAtBottom(atBottom);
//   };

//   useEffect(() => {
//     if (isAtBottom) {
//       scrollToBottom();
//     }
//   }, [messages, loading]);

//   return (
//     <div className="relative h-full">

//       <div
//         ref={containerRef}
//         onScroll={handleScroll}
//         className="h-full overflow-y-auto px-6 py-6"
//       >
//         <div className="space-y-5">

//           {messages.map((msg, index) => (
//             <MessageBubble
//               key={index}
//               role={msg.role}
//               content={msg.content}
//             />
//           ))}

//           {loading && (
//             <MessageBubble
//               role="assistant"
//               content={loadingText}
//             />
//           )}

//           <div ref={bottomRef} />

//         </div>
//       </div>

//       {!isAtBottom && (
//         <button
//           onClick={() => scrollToBottom()}
//           className="absolute bottom-6 right-6 rounded-full bg-cyan-500 px-4 py-2 text-white shadow-lg hover:bg-cyan-400"
//         >
//           ↓ New Messages
//         </button>
//       )}

//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiCode,
  FiSearch,
  FiCpu,
 
} from "react-icons/fi";

import MessageBubble from "./MessageBubble";

const suggestions = [
  {
    icon: <FiCode />,
    text: "Review my code",
  },
  
  {
    icon: <FiCpu />,
    text: "Optimize this",
  },
  {
    icon: <FiSearch />,
    text: "Explain line by line",
  },
  {
    icon: <FiCode />,
    text: "Convert to Java",
  },
  {
    icon: <FiSearch />,
    text: "Dry run for input X",
  },
];

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
    });
  };

  const handleScroll = () => {
    const el = containerRef.current;

    if (!el) return;

    setIsAtBottom(
      el.scrollHeight - el.scrollTop - el.clientHeight < 80
    );
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
        className="
          h-full
          overflow-y-auto
          px-8
          py-8
        "
      >
        {/* Empty State */}

        {messages.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              mx-auto
              max-w-xl
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-br
              from-white/[0.04]
              to-white/[0.02]
              p-8
              shadow-xl
            "
          >
            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-indigo-600
                  text-2xl
                "
              >
                🤖
              </div>

              <div>

                <h3 className="text-2xl font-bold text-white">
                  Hi! Paste your code above and ask me anything.
                </h3>

                <p className="mt-2 text-slate-400">
                  Examples
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-3">

              {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-5
                    py-3
                    text-left
                    text-slate-300
                    transition
                    hover:border-cyan-500/30
                    hover:bg-cyan-500/10
                  "
                >
                  {item.icon}

                  {item.text}
                </button>
              ))}

            </div>
          </motion.div>
        )}

        {/* Messages */}

        <div className="space-y-6">

          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {loading && (
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
              }}
            >
              <MessageBubble
                role="assistant"
                content={`🤖 ${loadingText}`}
              />
            </motion.div>
          )}

          <div ref={bottomRef} />

        </div>

      </div>

      {!isAtBottom && (
        <button
          onClick={() => scrollToBottom()}
          className="
            absolute
            bottom-8
            right-8
            flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-5
            py-3
            text-white
            shadow-[0_0_30px_rgba(34,211,238,.3)]
            hover:scale-105
            transition
          "
        >
          <FiArrowDown />
          New Messages
        </button>
      )}

    </div>
  );
}