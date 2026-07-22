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

const CodeReviewer = () => {
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
    header="💻 AI Code Reviewer"
    topPanel={
      <div className="p-5 space-y-4">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md bg-richblack-800 border border-richblack-600 px-3 py-2 text-white"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        {/* Monaco Editor */}
        <div className="h-[400px] overflow-hidden rounded-lg">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
          />
        </div>
      </div>
    }
    messages={messages}
    loading={loading}
    loadingText="Reviewing your code..."
    input={prompt}
    setInput={setPrompt}
    onSend={handleSend}
    placeholder="Ask anything about your code..."
  />
);
};

export default CodeReviewer;