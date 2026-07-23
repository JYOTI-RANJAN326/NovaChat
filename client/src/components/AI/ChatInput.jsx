// import { IoSend } from "react-icons/io5";

// export default function ChatInput({
//   value,
//   setValue,
//   onSend,
//   placeholder = "Ask anything...",
//   disabled = false,
// }) {
//   return (
//     <div className="border-t border-richblack-700 bg-richblack-800 p-4">
//       <div className="flex items-center gap-3">
//         <input
//           type="text"
//           value={value}
//           disabled={disabled}
//           placeholder={placeholder}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") onSend();
//           }}
//           className="flex-1 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-white outline-none focus:border-yellow-50"
//         />

//         <button
//           onClick={onSend}
//           disabled={disabled}
//           className="rounded-lg bg-yellow-50 p-3 text-richblack-900 hover:scale-105 transition"
//         >
//           <IoSend size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import {
  FiPaperclip,
  FiSend,
  FiTrash2,
  FiCode,
} from "react-icons/fi";

export default function ChatInput({
  value,
  setValue,
  onSend,
  placeholder = "Ask anything...",
  disabled = false,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="p-5">
      <div
        className={`
          rounded-[28px]
          border
          transition-all
          duration-300
          ${
            focused
              ? "border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,.15)]"
              : "border-white/10"
          }
          bg-[#111827]
        `}
      >
        {/* Text Area */}

        <textarea
          rows={4}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="
            w-full
            resize-none
            bg-transparent
            px-6
            pt-6
            text-lg
            text-white
            placeholder:text-slate-500
            outline-none
          "
        />

        {/* Bottom Toolbar */}

        <div className="mt-4 flex items-center justify-between border-t border-white/10 px-6 py-5">

          <div className="flex items-center gap-3">

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-4
                py-3
                text-slate-300
                transition
                hover:border-cyan-500/30
                hover:bg-cyan-500/10
                hover:text-cyan-300
              "
            >
              <FiPaperclip />
              Attach File
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-4
                py-3
                text-slate-300
                transition
                hover:border-cyan-500/30
                hover:bg-cyan-500/10
                hover:text-cyan-300
              "
            >
              <FiCode />
              Format Code
            </button>

            <button
              onClick={() => setValue("")}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-4
                py-3
                text-slate-300
                transition
                hover:border-red-500/30
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              <FiTrash2 />
              Clear
            </button>

          </div>

          <div className="flex items-center gap-6">

            <span className="text-sm text-slate-500">
              {value.length} / 4000
            </span>

            <button
              onClick={onSend}
              disabled={disabled || !value.trim()}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-indigo-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                shadow-[0_0_25px_rgba(34,211,238,.3)]
                transition-all
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(34,211,238,.45)]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <FiSend />
              Send
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
