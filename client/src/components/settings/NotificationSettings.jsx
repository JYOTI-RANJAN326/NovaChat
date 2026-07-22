import { useState } from "react";
import {
  FiBell,
  FiVolume2,
  FiMonitor,
  FiSmartphone,
} from "react-icons/fi";
import {  useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateSettings,
} from "../../services/settingsAPI";
const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
  desktop: true,
  messageSound: true,
  group: true,
  mentions: true,
  preview: true,
  ai: false,
});
  const toggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  const loadSettings = async () => {
  try {
    const res = await getProfile();

    const saved =
      res.data.data.settings?.notifications;

    console.log("Loading notification settings...");

if (saved) {
  setNotifications(saved);
}

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadSettings();
}, []);
const handleSave = async () => {
  try {
    await updateSettings({
      notifications,
    });
await loadSettings();

    toast.success("Notification settings updated");

  } catch (error) {
    console.error(error);
    toast.error("Failed to update notification settings");
  }
};
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          Notifications
        </h2>

        <p className="mt-1 text-slate-400">
          Manage how NovaChat notifies you.
        </p>
      </div>

      <SettingToggle
        icon={<FiMonitor />}
        title="Desktop Notifications"
        subtitle="Receive notifications on desktop."
        enabled={notifications.desktop}
        onToggle={() => toggle("desktop")}
      />

      <SettingToggle
        icon={<FiVolume2 />}
        title="Message Sounds"
        subtitle="Play sound when messages arrive."
        enabled={notifications.messageSound}
        onToggle={() => toggle("messageSound")}
      />

      <SettingToggle
        icon={<FiBell />}
        title="Group Notifications"
        subtitle="Notify for new group messages."
        enabled={notifications.group}
        onToggle={() => toggle("group")}
      />

      <SettingToggle
        icon={<FiBell />}
        title="Mention Notifications"
        subtitle="Notify when someone mentions you."
        enabled={notifications.mentions}
        onToggle={() => toggle("mentions")}
      />

      <SettingToggle
        icon={<FiSmartphone />}
        title="Show Message Preview"
        subtitle="Display message preview in notifications."
        enabled={notifications.preview}
        onToggle={() => toggle("preview")}
      />

      <SettingToggle
        icon={<FiBell />}
        title="AI Assistant Notifications"
        subtitle="Receive AI suggestions and reminders."
        enabled={notifications.ai}
        onToggle={() => toggle("ai")}
      />

      <button
      onClick={handleSave}
        className="
          w-full
          rounded-2xl
          bg-cyan-500
          py-4
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-cyan-600
        "
      >
        Save Changes
      </button>
    </div>
  );
};

const SettingToggle = ({
  icon,
  title,
  subtitle,
  enabled,
  onToggle,
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`h-8 w-16 rounded-full transition ${
          enabled ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-8 w-8 rounded-full bg-white transition ${
            enabled ? "translate-x-8" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationSettings;