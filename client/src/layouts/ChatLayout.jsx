function ChatLayout({ children }) {
  return (
    <div className="h-screen bg-[#070B18] p-5">
      <div
        className="
        h-full
        rounded-[32px]
        border
        border-slate-800
        bg-[#0B1120]
        overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}

export default ChatLayout;