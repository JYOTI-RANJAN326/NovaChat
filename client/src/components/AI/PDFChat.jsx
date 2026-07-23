import { useState } from "react";
import AIWorkspace from "./AIWorkspace";
import { uploadPDF, pdfChat } from "../../services/pdfAPI";
import { FiUploadCloud } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
const PDFChat = ({ setActiveTool }) => {
  const [file, setFile] = useState(null);
  const [pdfId, setPdfId] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Upload a PDF and ask me anything.\n\nExamples:\n• Summarize this PDF\n• Explain Chapter 2\n• Generate MCQs\n• Important interview questions",
    },
  ]);

  // Upload PDF
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", file);

      const res = await uploadPDF(formData);

      setPdfId(res.data.pdfId);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ **${res.data.fileName}** uploaded successfully.\n\nYou can now ask me anything about this PDF.`,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to upload PDF.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Chat
  const handleSend = async () => {
    if (!prompt.trim()) return;

    if (!pdfId) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Please upload a PDF first.",
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
      const res = await pdfChat({
        pdfId,
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
      console.error(err);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetPDF = () => {
  setFile(null);
  setPdfId(null);
  setPrompt("");

  setMessages([
    {
      role: "assistant",
      content:
        "👋 Upload a PDF and ask me anything.\n\nExamples:\n• Summarize this PDF\n• Explain Chapter 2\n• Generate MCQs\n• Important interview questions",
    },
  ]);
};

  return (
    <AIWorkspace
  setActiveTool={setActiveTool}
      header="📄 AI PDF Assistant"
topPanel={
  <div className="p-6">
    {!pdfId ? (
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-cyan-500 p-6">
        <FiUploadCloud
          size={42}
          className="text-cyan-400"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white"
        />

        {file && (
          <p className="text-green-400">
            📄 {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="rounded-lg bg-cyan-500 px-6 py-2 text-white hover:bg-cyan-400 disabled:opacity-50"
        >
          Upload PDF
        </button>
      </div>
    ) : (
      <div className="flex items-center justify-between rounded-xl border border-green-500 bg-green-900/20 p-4">
        <div>
          <h3 className="font-semibold text-green-400">
            ✅ PDF Ready
          </h3>

          <p className="text-sm text-richblack-200">
            {file?.name}
          </p>
        </div>

        <button
          onClick={resetPDF}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          New PDF
        </button>
      </div>
    )}
  </div>
}
      messages={messages}
      loading={loading}
      loadingText="Reading PDF..."
      input={prompt}
      setInput={setPrompt}
      onSend={handleSend}
      placeholder="Ask anything about this PDF..."
    />
  );
};

export default PDFChat;