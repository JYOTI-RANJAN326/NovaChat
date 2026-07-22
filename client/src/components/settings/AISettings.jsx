import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateSettings,
} from "../../services/settingsAPI";
import {
  FiCpu,
  FiZap,
  FiGlobe,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

const AISettings = () => {
  const [settings, setSettings] = useState({
    smartReply: true,
    autoSummary: true,
    grammar: true,
    translation: false,
    aiMemory: true,
    model: "GPT-4.1",
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
const loadSettings = async () => {
  try {
    const res = await getProfile();

    const saved = res.data.data.settings?.ai;

    if (saved) {
      setSettings(saved);
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
      ai: settings,
    });

    toast.success("AI settings updated");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update AI settings");
  }
};
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          AI Settings
        </h2>

        <p className="mt-2 text-slate-400">
          Configure NovaChat AI features.
        </p>
      </div>

      {/* AI Model */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          AI Model
        </h3>

        <select
          value={settings.model}
         onChange={(e) =>
  setSettings((prev) => ({
    ...prev,
    model: e.target.value,
  }))
}
          className="w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"
        >
          <option>GPT-4.1</option>
          <option>GPT-4o</option>
          <option>Gemini 2.5 Pro</option>
          <option>Claude 4 Sonnet</option>
        </select>
      </div>

      <ToggleCard
        icon={<FiZap />}
        title="Smart Replies"
        subtitle="Generate quick AI responses."
        enabled={settings.smartReply}
        onToggle={() => toggle("smartReply")}
      />

      <ToggleCard
        icon={<FiMessageCircle />}
        title="Auto Chat Summary"
        subtitle="Summarize long conversations."
        enabled={settings.autoSummary}
        onToggle={() => toggle("autoSummary")}
      />

      <ToggleCard
        icon={<FiCpu />}
        title="Grammar Correction"
        subtitle="Improve your messages before sending."
        enabled={settings.grammar}
        onToggle={() => toggle("grammar")}
      />

      <ToggleCard
        icon={<FiGlobe />}
        title="Auto Translation"
        subtitle="Translate incoming and outgoing messages."
        enabled={settings.translation}
        onToggle={() => toggle("translation")}
      />

      <ToggleCard
        icon={<FiShield />}
        title="AI Memory"
        subtitle="Allow AI to remember previous conversations."
        enabled={settings.aiMemory}
        onToggle={() => toggle("aiMemory")}
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
  Save AI Settings
</button>

    </div>
  );
};

const ToggleCard = ({
  icon,
  title,
  subtitle,
  enabled,
  onToggle,
}) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
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

export default AISettings;