import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { codeChat } from "../../services/aiAPI";
import AIWorkspace from "./AIWorkspace";
const languages = [
  "cpp",
  "c",
  "java",
  "python",
  "javascript",
  "typescript",
];

const CodeReviewer = ({ setActiveTool }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  
  const [loading, setLoading] = useState(false);
const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! Paste your code above and ask me anything.\n\nExamples:\n- Review my code\n- Find bugs\n- Optimize this\n- Explain line by line\n- Convert to Java\n- Dry run for input X",
    },
  ]);

 
 const handleSend = async () => {
  if (!prompt.trim()) return;

  if (!code.trim()) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "⚠️ Please paste your code first.",
      },
    ]);
    return;
  }

  const updatedMessages = [
    ...messages,
    {
      role: "user",
      content: prompt,
    },
  ];

  setMessages(updatedMessages);
  setPrompt("");
  setLoading(true);

  try {
    const res = await codeChat({
      language,
      code,
      messages: updatedMessages,
    });

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: res.data.reply,
      },
    ]);
  } catch (err) {
    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: "❌ Something went wrong.",
      },
    ]);
  }

  setLoading(false);
};
return (
  <AIWorkspace
    setActiveTool={setActiveTool}
    header="💻 AI Code Reviewer"
    topPanel={
      <div className="space-y-5 p-6">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-lg md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <span className="text-sm font-medium text-slate-300">
              Language
            </span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-2
                text-white
                outline-none
                transition
                focus:border-cyan-500
              "
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
            </select>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setCode("")}
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-2
                text-red-300
                transition
                hover:bg-red-500/20
              "
            >
              Clear
            </button>

            <button
              onClick={handleSend}
              disabled={!code.trim() || loading}
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                py-2
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {loading ? "Reviewing..." : "Review Code"}
            </button>

          </div>

        </div>

        {/* Monaco Editor */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#111827]
            shadow-[0_15px_45px_rgba(0,0,0,.35)]
          "
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-[#1E293B] px-5 py-3">

            <div className="flex items-center gap-2">

              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />

            </div>

            <span className="text-sm text-slate-400">
              {language.toUpperCase()} Editor
            </span>

          </div>

          <div className="h-[500px]">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontLigatures: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                padding: {
                  top: 20,
                  bottom: 20,
                },
              }}
            />
          </div>

        </div>

      </div>
    }
    messages={messages}
    loading={loading}
    loadingText="🔍 Reviewing your code..."
    input={prompt}
    setInput={setPrompt}
    onSend={handleSend}
    placeholder="Ask about complexity, bugs, optimization, refactoring..."
  />
);
};

export default CodeReviewer;