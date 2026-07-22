const suggestions = [
  {
    icon: "💻",
    text: "Write C++ BFS",
  },
  {
    icon: "⚛️",
    text: "Explain React Hooks",
  },
  {
    icon: "📄",
    text: "Summarize a PDF",
  },
  {
    icon: "🐞",
    text: "Debug my code",
  },
];

export default function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-5xl shadow-2xl">
        🤖
      </div>

      <h1 className="text-4xl font-bold text-white">
        Welcome to Nova AI
      </h1>

      <p className="mt-3 max-w-xl text-center text-slate-400">
        Your intelligent assistant for programming, DSA, web development,
        resume reviews, PDF analysis, and much more.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {suggestions.map((item) => (
          <button
            key={item.text}
            onClick={() => onSuggestion(item.text)}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.02]"
          >
            <div className="mb-2 text-3xl">{item.icon}</div>

            <p className="font-semibold text-white">
              {item.text}
            </p>
          </button>
        ))}
      </div>

    </div>
  );
}