// const suggestions = [
//   {
//     icon: "💻",
//     text: "Write C++ BFS",
//   },
//   {
//     icon: "⚛️",
//     text: "Explain React Hooks",
//   },
//   {
//     icon: "📄",
//     text: "Summarize a PDF",
//   },
//   {
//     icon: "🐞",
//     text: "Debug my code",
//   },
// ];

// export default function WelcomeScreen({ onSuggestion }) {
//   return (
//     <div className="flex h-full flex-col items-center justify-center px-6">

//       <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-5xl shadow-2xl">
//         🤖
//       </div>

//       <h1 className="text-4xl font-bold text-white">
//         Welcome to Nova AI
//       </h1>

//       <p className="mt-3 max-w-xl text-center text-slate-400">
//         Your intelligent assistant for programming, DSA, web development,
//         resume reviews, PDF analysis, and much more.
//       </p>

//       <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
//         {suggestions.map((item) => (
//           <button
//             key={item.text}
//             onClick={() => onSuggestion(item.text)}
//             className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.02]"
//           >
//             <div className="mb-2 text-3xl">{item.icon}</div>

//             <p className="font-semibold text-white">
//               {item.text}
//             </p>
//           </button>
//         ))}
//       </div>

//     </div>
//   );
// }


import { motion } from "framer-motion";
import {
  FiCode,
  FiFileText,
  FiSearch,
  FiCpu,
  FiArrowRight,
  FiZap,
} from "react-icons/fi";

const suggestions = [
  {
    icon: <FiCode />,
    title: "Write C++ BFS",
    description: "Generate clean and optimized BFS implementation.",
  },
  {
    icon: <FiCpu />,
    title: "Explain React Hooks",
    description: "Understand useState, useEffect and more.",
  },
  {
    icon: <FiFileText />,
    title: "Summarize a PDF",
    description: "Extract key insights from large documents.",
  },
  {
    icon: <FiSearch />,
    title: "Debug my code",
    description: "Find bugs and suggest improvements instantly.",
  },
];

export default function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto bg-[#0B1120] px-6 py-10">

      <div className="mx-auto w-full max-w-6xl">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_45px_rgba(34,211,238,.35)]">
            <FiZap className="text-5xl text-white" />
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Powered by AI
          </div>

          <h1 className="mt-6 text-5xl font-bold text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Nova AI
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Your intelligent AI assistant for programming, DSA, web development,
            resume reviews, document analysis, interview preparation, and much more.
          </p>
        </motion.div>

        {/* Suggestions */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {suggestions.map((item) => (
            <motion.button
              key={item.title}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => onSuggestion(item.title)}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
                text-left
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-cyan-500/30
                hover:bg-cyan-500/10
                hover:shadow-[0_0_35px_rgba(34,211,238,.15)]
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl text-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-cyan-400 transition group-hover:translate-x-1">
                Try now
                <FiArrowRight />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-white">
            🚀 What can Nova AI help you with?
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {[
              "Code Review",
              "DSA",
              "Interview Prep",
              "Resume Review",
              "Explain Algorithms",
              "Debugging",
              "Web Development",
              "AI Learning",
              "PDF Chat",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
              >
                {tag}
              </span>
            ))}

          </div>
        </motion.div>

      </div>

    </div>
  );
}