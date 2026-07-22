import { useState } from "react";
import {
  FiMoon,
  FiSun,
  FiMonitor,
  FiImage,
} from "react-icons/fi";
import { updateSettings } from "../../services/settingsAPI";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { getProfile } from "../../services/settingsAPI";
const AppearanceSettings = () => {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [bubbleStyle, setBubbleStyle] = useState("rounded");
  const [accentColor, setAccentColor] = useState("cyan");
  const [animations, setAnimations] = useState(true);
   const loadSettings = async () => {
    try {
      const res = await getProfile();

      const appearance = res.data.data.settings.appearance;
      if (!appearance) return;
      setTheme(appearance.theme);
      setAccentColor(appearance.accentColor);
      setBubbleStyle(appearance.bubbleStyle);
      setFontSize(appearance.fontSize);
      setAnimations(appearance.animations);

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
      appearance: {
        theme,
        accentColor,
        bubbleStyle,
        fontSize,
        animations,
      },
    });

    toast.success("Appearance updated");

  } catch (err) {

    toast.error("Failed to update settings");

  }
};
  return (
    <div className="space-y-8">

      {/* Theme */}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold text-white">
          Theme
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Choose your preferred appearance.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-4">

          <ThemeCard
            active={theme === "light"}
            icon={<FiSun />}
            title="Light"
            onClick={() => setTheme("light")}
          />

          <ThemeCard
            active={theme === "dark"}
            icon={<FiMoon />}
            title="Dark"
            onClick={() => setTheme("dark")}
          />

          <ThemeCard
            active={theme === "system"}
            icon={<FiMonitor />}
            title="System"
            onClick={() => setTheme("system")}
          />

        </div>

      </section>

      {/* Accent Color */}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold text-white">
          Accent Color
        </h2>

        <div className="mt-5 flex gap-4">

          <ColorCircle
  color="bg-cyan-500"
  selected={accentColor === "cyan"}
  onClick={() => setAccentColor("cyan")}
/>

<ColorCircle
  color="bg-blue-500"
  selected={accentColor === "blue"}
  onClick={() => setAccentColor("blue")}
/>

<ColorCircle
  color="bg-purple-500"
  selected={accentColor === "purple"}
  onClick={() => setAccentColor("purple")}
/>

<ColorCircle
  color="bg-pink-500"
  selected={accentColor === "pink"}
  onClick={() => setAccentColor("pink")}
/>

<ColorCircle
  color="bg-green-500"
  selected={accentColor === "green"}
  onClick={() => setAccentColor("green")}
/>

        </div>

      </section>

      {/* Wallpaper */}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center gap-3">

          <FiImage className="text-2xl text-cyan-400" />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Chat Wallpaper
            </h2>

            <p className="text-sm text-slate-400">
              Upload your own wallpaper.
            </p>

          </div>

        </div>

        <button
          className="
            mt-5
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            font-semibold
            text-white
            hover:bg-cyan-600
          "
        >
          Upload Wallpaper
        </button>

      </section>

      {/* Bubble Style */}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold text-white">
          Chat Bubble Style
        </h2>

        <select
          value={bubbleStyle}
          onChange={(e) => setBubbleStyle(e.target.value)}
          className="
            mt-4
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            p-3
            text-white
          "
        >
          <option value="rounded">Rounded</option>
          <option value="compact">Compact</option>
        </select>

      </section>

      {/* Font */}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold text-white">
          Font Size
        </h2>

        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="
            mt-4
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            p-3
            text-white
          "
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

      </section>

      {/* Animations */}

      <section className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">

        <div>

          <h2 className="font-semibold text-white">
            Enable Animations
          </h2>

          <p className="text-sm text-slate-400">
            Smooth transitions throughout NovaChat.
          </p>

        </div>

        <button
          onClick={() => setAnimations(!animations)}
          className={`h-8 w-16 rounded-full transition ${
            animations
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          <div
            className={`h-8 w-8 rounded-full bg-white transition ${
              animations
                ? "translate-x-8"
                : ""
            }`}
          />
        </button>

      </section>

      {/* Save */}

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

const ThemeCard = ({
  icon,
  title,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      rounded-2xl
      border
      p-6
      transition
      ${
        active
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-white/10 bg-white/5"
      }
    `}
  >
    <div className="text-3xl text-cyan-400">
      {icon}
    </div>

    <p className="mt-3 font-semibold text-white">
      {title}
    </p>
  </button>
);

const ColorCircle = ({
  color,
  selected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      h-10
      w-10
      rounded-full
      ${color}
      transition
      ${
        selected
          ? "ring-4 ring-white"
          : ""
      }
    `}
  />
);

export default AppearanceSettings;