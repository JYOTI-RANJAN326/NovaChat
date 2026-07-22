import Conversation from "./Conversation";
import ChatInput from "./ChatInput";

export default function AIWorkspace({
  header,
  topPanel,
  messages,
  loading,
  loadingText,
  input,
  setInput,
  onSend,
  placeholder,
  disabled,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-richblack-900">

      {/* Header */}
      <header className="flex-shrink-0 border-b border-richblack-700 bg-richblack-900 px-6 py-5">
        <h2 className="text-2xl font-semibold text-white">
          {header}
        </h2>
      </header>

      {/* Fixed Tool Panel */}
      {topPanel && (
        <section className="flex-shrink-0 border-b border-richblack-700 bg-richblack-900">
          {topPanel}
        </section>
      )}

      {/* Scrollable Conversation */}
      <main className="flex-1 min-h-0 overflow-hidden bg-richblack-900">
        <Conversation
          messages={messages}
          loading={loading}
          loadingText={loadingText}
        />
      </main>

      {/* Fixed Input */}
      <footer className="flex-shrink-0 border-t border-richblack-700 bg-richblack-900">
        <ChatInput
          value={input}
          setValue={setInput}
          onSend={onSend}
          placeholder={placeholder}
          disabled={disabled}
        />
      </footer>

    </div>
  );
}