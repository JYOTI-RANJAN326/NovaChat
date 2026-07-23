// import {
//   FiMessageSquare,
//   FiFileText,
//   FiCode,
//   FiImage,
//   FiGlobe,
// } from "react-icons/fi";

// const tools = [
//   {
//     id: "chat",
//     label: "AI Chat",
//     icon: <FiMessageSquare />,
//   },
//   {
//     id: "pdf",
//     label: "Chat with PDF",
//     icon: <FiFileText />,
//   },
//   {
//     id: "code",
//     label: "Code Reviewer",
//     icon: <FiCode />,
//   },
//   {
//     id: "image",
//     label: "Analyze Image",
//     icon: <FiImage />,
//   },
//   {
//     id: "web",
//     label: "Web Search",
//     icon: <FiGlobe />,
//   },
// ];

// export default function AIToolsSidebar({
//   activeTool,
//   setActiveTool,
// }) {
//   return (
//    <div
//   className="
//     w-[320px]
//     h-full
//     flex-shrink-0
//     border-r
//     border-white/10
//     bg-[#0F172A]
//   "
// >
// <br/>
//       <div className="p-6 ">

//         <h2 className="text-xl font-bold text-white">
//           🤖 Nova AI
//         </h2>

//         <p className="mt-1 text-sm text-slate-400">
//           AI Workspace
//         </p>

//       </div>
//      <br/>
//       <div className="px-3">

//         {tools.map((tool) => (

//           <button
//             key={tool.id}
//             onClick={() => setActiveTool(tool.id)}
//             className={`mb-2 flex w-full h-[30px] items-center gap-3 rounded-xl px-4 py-3 transition
//               ${
//                 activeTool === tool.id
//                   ? "bg-cyan-500 text-white"
//                   : "text-slate-300 hover:bg-white/5"
//               }
//             `}
//           >
//             {tool.icon}
//             {tool.label}
//           </button>

//         ))}

//       </div>

//     </div>
//   );
// }



import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiFileText,
  FiCode,
  FiImage,
  FiGlobe,
  FiChevronRight,
} from "react-icons/fi";

const tools = [
  {
    id: "chat",
    title: "AI Chat",
    subtitle: "Intelligent conversations",
    icon: FiMessageSquare,
  },
  {
    id: "pdf",
    title: "Chat with PDF",
    subtitle: "Ask questions to PDF",
    icon: FiFileText,
  },
  {
    id: "code",
    title: "Code Reviewer",
    subtitle: "Review & improve code",
    icon: FiCode,
  },
  {
    id: "image",
    title: "Analyze Image",
    subtitle: "Understand any image",
    icon: FiImage,
  },
  {
    id: "web",
    title: "Web Search",
    subtitle: "Search the web smartly",
    icon: FiGlobe,
  },
];

export default function AIToolsSidebar({
  activeTool,
  setActiveTool,
}) {
  return (
  <div
  className="
    w-[320px]
    h-full
    flex-shrink-0
    border-r
    border-white/10
    bg-[#0F172A]
  "
>
<br/>

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 text-xl">
            🤖
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              Nova AI
            </h2>

            <p className="text-slate-400">
              AI Workspace
            </p>

          </div>

        </div>

      </div>
<br/>
      {/* Cards */}

      <div className="mt-8 flex flex-col gap-4">

        {tools.map((tool) => {

          const Icon = tool.icon;

          const active = activeTool === tool.id;

          return (
            <motion.button
              key={tool.id}
              whileHover={{
                scale: 1.02,
                x: 4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setActiveTool(tool.id)}
              className={`
                group
                relative
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                p-5
                text-left
                transition-all
                duration-300

                ${
                  active
                    ? "border-cyan-400/30 bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-[0_0_35px_rgba(34,211,238,.35)]"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-400/20 hover:bg-white/[0.05]"
                }
              `}
            >
              <div className="flex items-center gap-4">

                <Icon
                  className={`text-2xl ${
                    active
                      ? "text-white"
                      : "text-slate-300"
                  }`}
                />

                <div>

                  <h3
                    className={`font-semibold ${
                      active
                        ? "text-white"
                        : "text-slate-100"
                    }`}
                  >
                    {tool.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm ${
                      active
                        ? "text-cyan-100"
                        : "text-slate-400"
                    }`}
                  >
                    {tool.subtitle}
                  </p>

                </div>

              </div>

           <FiChevronRight
    className={`
        text-2xl
        transition-all
        ${
            active
                ? "text-white"
                : "text-slate-500 group-hover:text-cyan-400"
        }
    `}
/>

            </motion.button>
          );
        })}
      </div>
   <br/>
    <br/>
     <br/>
      <br/>
      <br/>
    <br/>
     <br/>
      <br/>
      {/* Pro Tip */}

     <div
  className="
    mt-auto
    pt-10
  "
>
  <div
    className="
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-br
      from-white/[0.03]
      to-white/[0.01]
      p-6
      shadow-xl
    "
  >
    <h3 className="text-lg font-semibold text-white">
      ✨ Pro Tip
    </h3>

    <p className="mt-3 text-sm leading-7 text-slate-400">
      Use Code Reviewer for debugging,
      PDF Chat for notes,
      AI Chat for brainstorming,
      and Web Search for live information.
    </p>

    <div className="mt-6 h-[60px] rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10" />
  </div>
</div>
       
    </div>
  );
}