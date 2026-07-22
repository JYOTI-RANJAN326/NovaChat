import {
  FiMessageSquare,
  FiFileText,
  FiCode,
  FiImage,
  FiGlobe,
} from "react-icons/fi";

const tools = [
  {
    id: "chat",
    label: "AI Chat",
    icon: <FiMessageSquare />,
  },
  {
    id: "pdf",
    label: "Chat with PDF",
    icon: <FiFileText />,
  },
  {
    id: "code",
    label: "Code Reviewer",
    icon: <FiCode />,
  },
  {
    id: "image",
    label: "Analyze Image",
    icon: <FiImage />,
  },
  {
    id: "web",
    label: "Web Search",
    icon: <FiGlobe />,
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
      <div className="p-6 ">

        <h2 className="text-xl font-bold text-white">
          🤖 Nova AI
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          AI Workspace
        </p>

      </div>
     <br/>
      <div className="px-3">

        {tools.map((tool) => (

          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`mb-2 flex w-full h-[30px] items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                activeTool === tool.id
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }
            `}
          >
            {tool.icon}
            {tool.label}
          </button>

        ))}

      </div>

    </div>
  );
}