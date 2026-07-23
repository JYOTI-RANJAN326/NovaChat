// import Conversation from "./Conversation";
// import ChatInput from "./ChatInput";
// import { FiArrowLeft } from "react-icons/fi";
// export default function AIWorkspace({
//   header,
//   topPanel,
//   messages,
//   loading,
//   loadingText,
//   input,
//   setInput,
//   onSend,
//   placeholder,
//   disabled,
//   setActiveTool,
// }) {
//   return (
//     <div className="flex h-full min-h-0 flex-col overflow-hidden bg-richblack-900">

//       {/* Header */}
//       <header className="flex-shrink-0 border-b border-richblack-700 bg-richblack-900 px-6 py-5">
//   <div className="flex items-center gap-3">

//     {/* Mobile Back Button */}
//     <button
//       onClick={() => setActiveTool(null)}
//       className="
//         flex
//         lg:hidden
//         h-10
//         w-10
//         items-center
//         justify-center
//         rounded-xl
//         bg-white/5
//         text-white
//         hover:bg-white/10
//         transition
//       "
//     >
//       <FiArrowLeft size={22} />
//     </button>

//     <h2 className="text-2xl font-semibold text-white">
//       {header}
//     </h2>

//   </div>
// </header>

//       {/* Fixed Tool Panel */}
//       {topPanel && (
//         <section className="flex-shrink-0 border-b border-richblack-700 bg-richblack-900">
//           {topPanel}
//         </section>
//       )}

//       {/* Scrollable Conversation */}
//       <main className="flex-1 min-h-0 overflow-hidden bg-richblack-900">
//         <Conversation
//           messages={messages}
//           loading={loading}
//           loadingText={loadingText}
//         />
//       </main>

//       {/* Fixed Input */}
//       <footer className="flex-shrink-0 border-t border-richblack-700 bg-richblack-900">
//         <ChatInput
//           value={input}
//           setValue={setInput}
//           onSend={onSend}
//           placeholder={placeholder}
//           disabled={disabled}
//         />
//       </footer>

//     </div>
//   );
// }



import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

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
  setActiveTool,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0B1120] p-6">

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          mb-5
          flex
          items-center
          justify-between
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          px-8
          py-5
          shadow-[0_10px_40px_rgba(0,0,0,.35)]
          backdrop-blur-xl
        "
      >
        <div className="flex items-center gap-4">

          {/* Mobile Back */}
          <button
            onClick={() => setActiveTool(null)}
            className="
              flex
              lg:hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-white/5
              text-white
              hover:bg-white/10
            "
          >
            <FiArrowLeft size={22} />
          </button>

          <h2 className="text-3xl font-bold text-white">
            {header}
          </h2>

        </div>
      </motion.header>

      {/* Tool Panel */}
      {topPanel && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mb-5
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            shadow-xl
            backdrop-blur-xl
          "
        >
          {topPanel}
        </motion.section>
      )}

      {/* Conversation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          flex-1
          min-h-0
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          shadow-[0_15px_45px_rgba(0,0,0,.35)]
        "
      >
        <Conversation
          messages={messages}
          loading={loading}
          loadingText={loadingText}
        />
      </motion.div>

      {/* Input */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          mt-7
          
          rounded-3xl
          border
          border-cyan-500/20
          bg-gradient-to-r
          from-[#101826]
          to-[#0F172A]
          shadow-[0_0_45px_rgba(34,211,238,.12)]
          backdrop-blur-2xl
        "
      >
        <ChatInput 
          value={input}
          setValue={setInput}
          onSend={onSend}
          placeholder={placeholder}
          disabled={disabled}
        />
        <br/>
      </motion.footer>

    </div>
  );
}
