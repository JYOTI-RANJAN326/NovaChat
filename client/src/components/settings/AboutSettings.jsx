import {
  FiInfo,
  FiStar,
  FiMail,
  FiAlertCircle,
  FiFileText,
  FiShield,
  FiGithub,
  FiHeart,
} from "react-icons/fi";

const AboutSettings = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex items-center gap-3">

          <FiInfo className="text-3xl text-cyan-400" />

          <div>

            <h2 className="text-2xl font-semibold text-white">
              About NovaChat
            </h2>

            <p className="text-slate-400">
              Version 1.0.0
            </p>

          </div>

        </div>

      </div>

      <AboutCard
        icon={<FiStar />}
        title="What's New"
        subtitle="View the latest features and improvements."
      />

      <AboutCard
        icon={<FiShield />}
        title="Privacy Policy"
        subtitle="Learn how your data is protected."
      />

      <AboutCard
        icon={<FiFileText />}
        title="Terms & Conditions"
        subtitle="Read the terms of using NovaChat."
      />

      <AboutCard
        icon={<FiMail />}
        title="Send Feedback"
        subtitle="Help us improve NovaChat."
      />

      <AboutCard
        icon={<FiAlertCircle />}
        title="Report a Bug"
        subtitle="Found an issue? Let us know."
      />

      <AboutCard
        icon={<FiGithub />}
        title="GitHub Repository"
        subtitle="View the source code."
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">

        <FiHeart className="mx-auto text-4xl text-red-500" />

        <h2 className="mt-4 text-xl font-semibold text-white">
          Built with ❤️ using MERN & AI
        </h2>

        <p className="mt-2 text-slate-400">
          NovaChat is powered by React, Node.js, Express,
          MongoDB, Socket.IO and AI technologies.
        </p>

      </div>

    </div>
  );
};

const AboutCard = ({
  icon,
  title,
  subtitle,
}) => (
  <button
    className="
      flex
      w-full
      items-center
      justify-between
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-6
      transition
      hover:border-cyan-500/30
      hover:bg-white/10
    "
  >
    <div className="flex items-center gap-4">

      <div className="rounded-xl bg-cyan-500/10 p-3 text-xl text-cyan-400">
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

    <span className="text-slate-500 text-xl">›</span>
  </button>
);

export default AboutSettings;