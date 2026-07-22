import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiBell,
  FiMoon,
  FiShield,
  FiUser,
  FiLogOut,
  FiChevronRight,
  FiArrowLeft,
} from "react-icons/fi";

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#030712] via-[#0B1120] to-[#111827] p-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.45)]"
      >
        {/* Header */}
        <div className="mb-8">
          {activeTab !== "home" && (
            <button
              onClick={() => setActiveTab("home")}
              className="mb-6 flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2 text-cyan-400 transition hover:bg-cyan-500/20"
            >
              <FiArrowLeft />
              Back
            </button>
          )}

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
          <div className="space-y-5">
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
        hover:translate-x-1
        hover:border-cyan-500/30
        hover:bg-white/[0.06]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            rounded-xl
            bg-cyan-500/10
            p-3
            text-xl
            text-cyan-400
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