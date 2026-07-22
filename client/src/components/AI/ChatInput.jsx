import { IoSend } from "react-icons/io5";

export default function ChatInput({
  value,
  setValue,
  onSend,
  placeholder = "Ask anything...",
  disabled = false,
}) {
  return (
    <div className="border-t border-richblack-700 bg-richblack-800 p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          className="flex-1 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-white outline-none focus:border-yellow-50"
        />

        <button
          onClick={onSend}
          disabled={disabled}
          className="rounded-lg bg-yellow-50 p-3 text-richblack-900 hover:scale-105 transition"
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
}