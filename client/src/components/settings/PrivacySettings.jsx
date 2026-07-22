import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateSettings,
} from "../../services/settingsAPI";
import {
  FiEye,
  FiLock,
  FiShield,
  FiUsers,
  FiSmartphone,
} from "react-icons/fi";

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
  lastSeen: "Everyone",
  profilePhoto: "Everyone",
  onlineStatus: true,
  readReceipts: true,
  typingIndicator: true,
  twoFactor: false,
});

  const toggle = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
const handleSelect = (key, value) => {
  setPrivacy((prev) => ({
    ...prev,
    [key]: value,
  }));
};
const loadSettings = async () => {
  try {
    const res = await getProfile();

    const saved =
      res.data.data.settings?.privacy;

    if (saved) {
      setPrivacy(saved);
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
      privacy,
    });

    toast.success("Privacy settings updated");

  } catch (error) {

    console.error(error);
    toast.error("Update failed");

  }
};
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          Privacy & Security
        </h2>

        <p className="mt-1 text-slate-400">
          Control who can see your information and protect your account.
        </p>
      </div>

      {/* Last Seen */}

      <Card title="Last Seen" icon={<FiEye />}>
        <select
          value={privacy.lastSeen}
          onChange={(e) =>
            handleSelect(
              
              "lastSeen", e.target.value,
            )
          }
          className="mt-4 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"
        >
          <option>Everyone</option>
          <option>My Contacts</option>
          <option>Nobody</option>
        </select>
      </Card>

      {/* Profile Photo */}

      <Card title="Profile Photo" icon={<FiUsers />}>
        <select
          value={privacy.profilePhoto}
          onChange={(e) =>
             handleSelect(
    "profilePhoto",
    e.target.value
  )
          }
          className="mt-4 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"
        >
          <option>Everyone</option>
          <option>My Contacts</option>
          <option>Nobody</option>
        </select>
      </Card>

      <ToggleCard
        icon={<FiEye />}
        title="Online Status"
        subtitle="Show when you are online."
        enabled={privacy.onlineStatus}
        onToggle={() => toggle("onlineStatus")}
      />

      <ToggleCard
        icon={<FiShield />}
        title="Read Receipts"
        subtitle="Send and receive read receipts."
        enabled={privacy.readReceipts}
        onToggle={() => toggle("readReceipts")}
      />

      <ToggleCard
        icon={<FiSmartphone />}
        title="Typing Indicator"
        subtitle="Show when you're typing."
        enabled={privacy.typingIndicator}
        onToggle={() => toggle("typingIndicator")}
      />

      <ToggleCard
        icon={<FiLock />}
        title="Two-Factor Authentication"
        subtitle="Add an extra layer of security."
        enabled={privacy.twoFactor}
        onToggle={() => toggle("twoFactor")}
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Blocked Users
            </h3>

            <p className="text-sm text-slate-400">
              Manage blocked contacts.
            </p>
          </div>

          <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600">
            View
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Active Sessions
            </h3>

            <p className="text-sm text-slate-400">
              View logged-in devices.
            </p>
          </div>

          <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600">
            Manage
          </button>
        </div>
      </div>

      <button
       onClick={handleSave}
        className="w-full rounded-2xl bg-cyan-500 py-4 text-lg font-semibold text-white hover:bg-cyan-600">
        Save Changes
      </button>

    </div>
  );
};

const Card = ({ title, icon, children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
        {icon}
      </div>

      <h3 className="font-semibold text-white">
        {title}
      </h3>
    </div>

    {children}
  </div>
);

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

export default PrivacySettings;