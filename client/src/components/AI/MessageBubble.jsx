// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { FiCopy, FiCheck } from "react-icons/fi";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { motion } from "framer-motion";

// const MessageBubble = ({ role, content }) => {
//   const [copied, setCopied] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25 }}
//       className={`flex items-end gap-3 ${
//         role === "user" ? "justify-end" : "justify-start"
//       }`}
//     >
//       {/* AI Avatar */}
//       {role === "assistant" && (
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg shadow-lg">
//           🤖
//         </div>
//       )}

//       {/* Bubble */}
//       <div
//         className={`group relative max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] overflow-hidden px-5 py-4 shadow-lg transition-all duration-200 hover:scale-[1.01]
//         ${
//           role === "user"
//             ? "rounded-3xl rounded-br-md bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white"
//             : "rounded-3xl rounded-bl-md border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl"
//         }`}
//       >
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ inline, className, children }) {
//               const match = /language-(\w+)/.exec(className || "");

//               if (!inline && match) {
//                 const code = String(children).replace(/\n$/, "");

//                 return (
//                   <div className="relative mt-3">
//                     {/* Copy Button */}
//                     <div className="absolute right-3 top-3 z-10">
//                       <CopyToClipboard
//                         text={code}
//                         onCopy={() => {
//                           setCopied(true);
//                           setTimeout(() => setCopied(false), 1500);
//                         }}
//                       >
//                         <button className="rounded-lg bg-slate-800/80 p-2 text-white transition hover:bg-slate-700">
//                           {copied ? <FiCheck /> : <FiCopy />}
//                         </button>
//                       </CopyToClipboard>
//                     </div>

//                     <SyntaxHighlighter
//                       language={match[1]}
//                       style={oneDark}
//                       PreTag="div"
//                       customStyle={{
//                         margin: 0,
//                         borderRadius: "16px",
//                         fontSize: "14px",
//                         paddingTop: "48px",
//                       }}
//                     >
//                       {code}
//                     </SyntaxHighlighter>
//                   </div>
//                 );
//               }

//               return (
//                 <code className="rounded-md bg-slate-800 px-1.5 py-1 text-cyan-300">
//                   {children}
//                 </code>
//               );
//             },

//             p({ children }) {
//               return (
//                 <p className="mb-3 leading-7 text-[15px]">
//                   {children}
//                 </p>
//               );
//             },

//             ul({ children }) {
//               return (
//                 <ul className="mb-3 list-disc pl-6">
//                   {children}
//                 </ul>
//               );
//             },

//             ol({ children }) {
//               return (
//                 <ol className="mb-3 list-decimal pl-6">
//                   {children}
//                 </ol>
//               );
//             },

//             h1({ children }) {
//               return (
//                 <h1 className="mb-4 text-2xl font-bold">
//                   {children}
//                 </h1>
//               );
//             },

//             h2({ children }) {
//               return (
//                 <h2 className="mb-3 text-xl font-semibold">
//                   {children}
//                 </h2>
//               );
//             },

//             blockquote({ children }) {
//               return (
//                 <blockquote className="my-4 border-l-4 border-cyan-400 pl-4 italic text-slate-300">
//                   {children}
//                 </blockquote>
//               );
//             },
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>

//       {/* User Avatar */}
//       {role === "user" && (
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-lg">
//           U
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default MessageBubble;

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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-4 ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {role === "assistant" && (
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-400
            via-sky-500
            to-indigo-600
            text-xl
            shadow-[0_0_25px_rgba(34,211,238,.35)]
          "
        >
          🤖
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`group relative overflow-hidden px-6 py-5 shadow-lg transition-all duration-200 hover:scale-[1.01]
        max-w-[88%] md:max-w-[80%] lg:max-w-[72%]
        ${
          role === "user"
            ? "rounded-3xl rounded-br-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_35px_rgba(34,211,238,.25)]"
            : "rounded-3xl rounded-bl-lg border border-cyan-500/10 bg-gradient-to-br from-[#141C2D] to-[#111827] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,.35)]"
        }`}
      >
        {role === "assistant" && (
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
              Nova AI
            </span>

            <span className="text-xs text-slate-500">
              just now
            </span>
          </div>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                const code = String(children).replace(/\n$/, "");

                return (
                  <div className="my-5 overflow-hidden rounded-2xl border border-white/10">

                    {/* Code Header */}

                    <div className="flex items-center justify-between bg-[#1E293B] px-5 py-3">

                      <span className="text-sm font-medium text-slate-300">
                        {match[1]}
                      </span>

                      <CopyToClipboard
                        text={code}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                      >
                        <button
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-white/10
                            bg-black/40
                            px-3
                            py-2
                            text-sm
                            text-white
                            backdrop-blur-xl
                            transition
                            hover:bg-black/60
                          "
                        >
                          {copied ? (
                            <>
                              <FiCheck />
                              Copied
                            </>
                          ) : (
                            <>
                              <FiCopy />
                              Copy
                            </>
                          )}
                        </button>
                      </CopyToClipboard>
                    </div>

                    <SyntaxHighlighter
                      language={match[1]}
                      style={oneDark}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        padding: "22px",
                        fontSize: "14px",
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>

                  </div>
                );
              }

              return (
                <code className="rounded-md bg-slate-800 px-2 py-1 text-cyan-300">
                  {children}
                </code>
              );
            },

            p({ children }) {
              return (
                <p className="mb-4 text-[16px] leading-8">
                  {children}
                </p>
              );
            },

            h1({ children }) {
              return (
                <h1 className="mb-4 text-3xl font-bold">
                  {children}
                </h1>
              );
            },

            h2({ children }) {
              return (
                <h2 className="mb-3 text-2xl font-semibold">
                  {children}
                </h2>
              );
            },

            h3({ children }) {
              return (
                <h3 className="mb-3 text-xl font-semibold">
                  {children}
                </h3>
              );
            },
                        ul({ children }) {
              return (
                <ul className="mb-4 list-disc space-y-2 pl-6">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="mb-4 list-decimal space-y-2 pl-6">
                  {children}
                </ol>
              );
            },

            li({ children }) {
              return (
                <li className="leading-7">
                  {children}
                </li>
              );
            },

            blockquote({ children }) {
              return (
                <blockquote
                  className="
                    my-5
                    rounded-r-xl
                    border-l-4
                    border-cyan-400
                    bg-cyan-500/5
                    py-3
                    pl-5
                    italic
                    text-slate-300
                  "
                >
                  {children}
                </blockquote>
              );
            },

            hr() {
              return (
                <hr className="my-6 border-white/10" />
              );
            },

            a({ children, href }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-cyan-400 underline transition hover:text-cyan-300"
                >
                  {children}
                </a>
              );
            },

            table({ children }) {
              return (
                <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
                  <table className="min-w-full border-collapse">
                    {children}
                  </table>
                </div>
              );
            },

            thead({ children }) {
              return (
                <thead className="bg-slate-800">
                  {children}
                </thead>
              );
            },

            tbody({ children }) {
              return (
                <tbody className="divide-y divide-white/10">
                  {children}
                </tbody>
              );
            },

            tr({ children }) {
              return (
                <tr className="hover:bg-white/5 transition-colors">
                  {children}
                </tr>
              );
            },

            th({ children }) {
              return (
                <th className="border border-white/10 px-4 py-3 text-left font-semibold text-slate-200">
                  {children}
                </th>
              );
            },

            td({ children }) {
              return (
                <td className="border border-white/10 px-4 py-3 text-slate-300">
                  {children}
                </td>
              );
            },

            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="my-5 max-h-[500px] w-full rounded-2xl border border-white/10 object-cover"
                />
              );
            },

            strong({ children }) {
              return (
                <strong className="font-semibold text-white">
                  {children}
                </strong>
              );
            },

            em({ children }) {
              return (
                <em className="italic text-slate-300">
                  {children}
                </em>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* User Avatar */}
      {role === "user" && (
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-500
            via-fuchsia-500
            to-pink-500
            text-sm
            font-bold
            text-white
            shadow-[0_0_25px_rgba(168,85,247,.35)]
          "
        >
          U
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;

