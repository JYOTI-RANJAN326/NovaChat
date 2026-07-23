import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiBell,
  FiMoon,
  FiShield,
  FiUser,
  FiLogOut,
  FiChevronRight,
  
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import PrivacySettings from "../components/settings/PrivacySettings";
import AccountSettings from "../components/settings/AccountSettings";
import { FiCpu } from "react-icons/fi";
import AISettings from "../components/settings/AISettings";
import { FiInfo } from "react-icons/fi";
import AboutSettings from "../components/settings/AboutSettings";
import { FiHardDrive } from "react-icons/fi";
import StorageSettings from "../components/settings/StorageSettings";
function Settings() {
  const [activeTab, setActiveTab] = useState("home");
const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#030712] via-[#0B1120] to-[#111827] p-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
       className="relative mx-auto max-w-6xl rounded-[36px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,.45)]"
      >
        {/* Header */}
     {/* Header */}
<div className="mb-8">

  {/* Back Button */}
  <button
    onClick={() => {
      if (activeTab === "home") {
        navigate("/chat");
      } else {
        setActiveTab("home");
      }
    }}
    className="
      mb-6
      flex
      items-center
      gap-2
      rounded-xl
      bg-cyan-500/10
      px-4
      py-2
      text-cyan-400
      transition-all
      hover:bg-cyan-500/20
      hover:text-cyan-300
    "
  >
    <FiArrowLeft size={18} />
    Back
  </button>

  <h1 className="text-4xl font-bold text-white">
    {activeTab === "home"
      ? "Settings"
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
  </h1>

  <p className="mt-2 text-slate-400">
    Customize your NovaChat experience.
  </p>

</div>

        {/* Home */}
        {activeTab === "home" && (
          <div className="space-y-4">
            <SettingCard
              icon={<FiMoon />}
              title="Appearance"
              subtitle="Dark mode, themes and colors"
              onClick={() => setActiveTab("appearance")}
            />

            <SettingCard
              icon={<FiBell />}
              title="Notifications"
              subtitle="Messages, sounds and alerts"
              onClick={() => setActiveTab("notifications")}
            />

            <SettingCard
              icon={<FiShield />}
              title="Privacy & Security"
              subtitle="Blocked users, visibility and encryption"
              onClick={() => setActiveTab("privacy")}
            />

            <SettingCard
              icon={<FiUser />}
              title="Account"
              subtitle="Profile information and password"
              onClick={() => setActiveTab("account")}
            />
            <SettingCard
  icon={<FiCpu />}
  title="AI Settings"
  subtitle="Customize NovaChat AI features"
  onClick={() => setActiveTab("ai")}
/>

<SettingCard
  icon={<FiHardDrive />}
  title="Storage & Data"
  subtitle="Downloads, cache and media usage"
  onClick={() => setActiveTab("storage")}
/>
<SettingCard
  icon={<FiInfo />}
  title="About"
  subtitle="Version, support and legal information"
  onClick={() => setActiveTab("about")}
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
        )}

        {/* Appearance */}
        {activeTab === "appearance" && <AppearanceSettings />}

        {/* Notifications */}
        {activeTab === "notifications" && <NotificationSettings />}

        {/* Privacy */}
        {activeTab === "privacy" && <PrivacySettings />}

        {/* Account */}
        {activeTab === "account" && <AccountSettings />}
         {activeTab === "ai" && <AISettings />}

        {activeTab === "storage" && <StorageSettings />}
        {activeTab === "about" && <AboutSettings />}
      </motion.div>
    </div>
  );
}

const SettingCard = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        flex
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-r
        from-white/[0.03]
        to-white/[0.015]
        px-6
        py-5
        transition-all
        duration-300
        hover:border-cyan-500/30
        hover:bg-white/[0.06]
        hover:shadow-[0_0_30px_rgba(34,211,238,.15)]
      "
    >
      {/* Left glow */}
      <div
        className="
          absolute
          inset-y-0
          left-0
          w-1
          scale-y-0
          rounded-r-full
          bg-cyan-400
          transition-transform
          duration-300
          group-hover:scale-y-100
        "
      />

      <div className="flex items-center gap-5">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500/20
            to-blue-600/20
            text-2xl
            text-cyan-300
            transition
            group-hover:scale-110
          "
        >
          {icon}
        </div>

        <div className="text-left">

          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>

        </div>

      </div>

      <FiChevronRight
        className="
          text-slate-500
          transition
          duration-300
          group-hover:translate-x-1
          group-hover:text-cyan-300
        "
        size={22}
      />
    </button>
  );
};

export default Settings;