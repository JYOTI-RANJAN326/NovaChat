import { motion } from "framer-motion";
import {
  FiBell,
  FiMoon,
  FiShield,
  FiUser,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0B1120] to-[#111827] p-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .45 }}
        className="relative mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.45)]"
      >
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Customize your NovaChat experience.
        </p>

        <div className="mt-10 space-y-5">

          <SettingCard
            icon={<FiMoon />}
            title="Appearance"
            subtitle="Dark mode, themes and colors"
          />

          <SettingCard
            icon={<FiBell />}
            title="Notifications"
            subtitle="Messages, sounds and alerts"
          />

          <SettingCard
            icon={<FiShield />}
            title="Privacy & Security"
            subtitle="Blocked users, visibility and encryption"
          />

          <SettingCard
            icon={<FiUser />}
            title="Account"
            subtitle="Profile information and password"
          />

          <button
            className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-red-500/10
            py-4
            font-semibold
            text-red-400
            transition-all
            hover:bg-red-500/20
          "
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </motion.div>
    </div>
  );
}

const SettingCard = ({ icon, title, subtitle }) => {
  return (
    <button
      className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      border
      border-white/10
      bg-white/[0.03]
      p-5
      transition-all
      duration-300
      hover:border-cyan-500/30
      hover:bg-white/[0.06]
      hover:translate-x-1
    "
    >
      <div className="flex items-center gap-4">
        <div
          className="
          rounded-xl
          bg-cyan-500/10
          p-3
          text-cyan-400
          text-xl
        "
        >
          {icon}
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <FiChevronRight className="text-slate-500" />
    </button>
  );
};

export default Settings;