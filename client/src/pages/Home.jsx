import { motion } from "framer-motion";
import {
  FiMessageCircle,
  FiShield,
  FiUsers,
  FiZap,
} from "react-icons/fi";

function Home() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#030712] via-[#0B1120] to-[#111827] text-white">
      {/* Background Glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.04] p-12 text-center shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_35px_rgba(34,211,238,0.35)]">
          <FiMessageCircle className="text-5xl text-white" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            NovaChat
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Fast, secure and modern messaging built for seamless conversations.
          Select a chat from the left sidebar or create a new one to start
          messaging.
        </p>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/10">
            <FiShield className="mx-auto text-3xl text-cyan-400" />
            <h3 className="mt-4 font-semibold">Secure</h3>
            <p className="mt-2 text-sm text-slate-400">
              End-to-end protected messaging.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/10">
            <FiZap className="mx-auto text-3xl text-cyan-400" />
            <h3 className="mt-4 font-semibold">Realtime</h3>
            <p className="mt-2 text-sm text-slate-400">
              Instant message delivery with Socket.IO.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/10">
            <FiUsers className="mx-auto text-3xl text-cyan-400" />
            <h3 className="mt-4 font-semibold">Groups</h3>
            <p className="mt-2 text-sm text-slate-400">
              Create and manage group conversations.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-slate-500">
          Choose a conversation from the left to begin chatting.
        </p>
      </motion.div>
    </div>
  );
}

export default Home;