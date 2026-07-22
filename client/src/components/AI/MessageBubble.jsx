import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion } from "framer-motion";

const MessageBubble = ({ role, content }) => {
  const [copied, setCopied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-3 ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {role === "assistant" && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg shadow-lg">
          🤖
        </div>
      )}

      {/* Bubble */}
      <div
        className={`group relative max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] overflow-hidden px-5 py-4 shadow-lg transition-all duration-200 hover:scale-[1.01]
        ${
          role === "user"
            ? "rounded-3xl rounded-br-md bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white"
            : "rounded-3xl rounded-bl-md border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                const code = String(children).replace(/\n$/, "");

                return (
                  <div className="relative mt-3">
                    {/* Copy Button */}
                    <div className="absolute right-3 top-3 z-10">
                      <CopyToClipboard
                        text={code}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                      >
                        <button className="rounded-lg bg-slate-800/80 p-2 text-white transition hover:bg-slate-700">
                          {copied ? <FiCheck /> : <FiCopy />}
                        </button>
                      </CopyToClipboard>
                    </div>

                    <SyntaxHighlighter
                      language={match[1]}
                      style={oneDark}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: "16px",
                        fontSize: "14px",
                        paddingTop: "48px",
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code className="rounded-md bg-slate-800 px-1.5 py-1 text-cyan-300">
                  {children}
                </code>
              );
            },

            p({ children }) {
              return (
                <p className="mb-3 leading-7 text-[15px]">
                  {children}
                </p>
              );
            },

            ul({ children }) {
              return (
                <ul className="mb-3 list-disc pl-6">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="mb-3 list-decimal pl-6">
                  {children}
                </ol>
              );
            },

            h1({ children }) {
              return (
                <h1 className="mb-4 text-2xl font-bold">
                  {children}
                </h1>
              );
            },

            h2({ children }) {
              return (
                <h2 className="mb-3 text-xl font-semibold">
                  {children}
                </h2>
              );
            },

            blockquote({ children }) {
              return (
                <blockquote className="my-4 border-l-4 border-cyan-400 pl-4 italic text-slate-300">
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* User Avatar */}
      {role === "user" && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-lg">
          U
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;