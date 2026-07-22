import {
  FiHardDrive,
  
  FiDownload,

  
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateSettings,
} from "../../services/settingsAPI";
const StorageSettings = () => {
    const [storage, setStorage] = useState({
  autoDownload: {
    images: true,
    videos: false,
    documents: true,
  },
});
const toggle = (key) => {
  setStorage((prev) => ({
    ...prev,
    autoDownload: {
      ...prev.autoDownload,
      [key]: !prev.autoDownload[key],
    },
  }));
};
const loadSettings = async () => {
  try {
    const res = await getProfile();

    const saved = res.data.data.settings?.storage;

    if (saved) {
      setStorage(saved);
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
      storage,
    });

    toast.success("Storage settings updated");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update storage settings");
  }
};
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          Storage & Data
        </h2>

        <p className="mt-2 text-slate-400">
          Manage media storage, downloads and cached files.
        </p>
      </div>

      {/* Storage Usage */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center gap-3">
          <FiHardDrive className="text-2xl text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            Storage Usage
          </h3>
        </div>

        <div className="mt-6 space-y-5">

          <StorageBar
            title="Images"
            size="1.8 GB"
            width="70%"
          />

          <StorageBar
            title="Videos"
            size="4.2 GB"
            width="90%"
          />

          <StorageBar
            title="Documents"
            size="560 MB"
            width="40%"
          />

          <StorageBar
            title="Cache"
            size="320 MB"
            width="25%"
          />

        </div>

      </div>

      {/* Auto Download */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center gap-3">
          <FiDownload className="text-cyan-400 text-xl" />

          <h3 className="font-semibold text-white">
            Auto Download
          </h3>
        </div>

        <div className="mt-5 space-y-3">

         <label className="flex items-center gap-3 text-white">
  <input
    type="checkbox"
    checked={storage.autoDownload.images}
    onChange={() => toggle("images")}
  />
  Images
</label>

<label className="flex items-center gap-3 text-white">
  <input
    type="checkbox"
    checked={storage.autoDownload.videos}
    onChange={() => toggle("videos")}
  />
  Videos
</label>

<label className="flex items-center gap-3 text-white">
  <input
    type="checkbox"
    checked={storage.autoDownload.documents}
    onChange={() => toggle("documents")}
  />
  Documents
</label>
        </div>

      </div>

      {/* Clear Cache */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-white">
              Clear Cache
            </h3>

            <p className="text-sm text-slate-400">
              Remove temporary files without deleting chats.
            </p>

          </div>

          <button
  onClick={() => toast("Coming soon")}
  className="rounded-xl bg-cyan-500 px-5 py-2 text-white hover:bg-cyan-600"
>
  Manage
</button>
        </div>

      </div>

      {/* Manage Downloads */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-white">
              Manage Downloads
            </h3>

            <p className="text-sm text-slate-400">
              Remove downloaded media from your device.
            </p>

          </div>

          <button
  onClick={() => toast("Coming soon")}
  className="rounded-xl bg-cyan-500 px-5 py-2 text-white hover:bg-cyan-600"
>
  Manage
</button>

        </div>

      </div>

      {/* Export Chats */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-white">
              Export Chat Data
            </h3>

            <p className="text-sm text-slate-400">
              Download your conversations and media.
            </p>

          </div>

         <button
  onClick={() => toast("Export feature coming soon")}
  className="rounded-xl bg-cyan-500 px-5 py-2 text-white hover:bg-cyan-600"
>
  Export
</button>
        </div>

      </div>

      <button
  onClick={handleSave}
  className="w-full rounded-2xl bg-cyan-500 py-4 text-lg font-semibold text-white hover:bg-cyan-600"
>
  Save Changes
</button>

    </div>
  );
};

const StorageBar = ({ title, size, width }) => (
  <div>

    <div className="mb-2 flex justify-between">

      <span className="text-white">
        {title}
      </span>

      <span className="text-slate-400">
        {size}
      </span>

    </div>

    <div className="h-3 rounded-full bg-slate-700">

      <div
        className="h-3 rounded-full bg-cyan-500"
        style={{ width }}
      />

    </div>

  </div>
);

export default StorageSettings;