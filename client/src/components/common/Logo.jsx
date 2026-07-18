import { motion } from "framer-motion";

const Logo = ({ size = "default" }) => {
  const boxSize =
    size === "small"
      ? "h-12 w-12"
      : size === "large"
      ? "h-20 w-20"
      : "h-16 w-16";

  const textSize =
    size === "small"
      ? "text-2xl"
      : size === "large"
      ? "text-[42px]"
      : "text-3xl";

  const titleSize =
    size === "small"
      ? "text-3xl"
      : size === "large"
      ? "text-[54px]"
      : "text-4xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-5 select-none"
    >
      {/* Icon */}

      <div className={`${boxSize} relative`}>

        {/* Glow */}

        <div className="absolute inset-0 rounded-3xl bg-cyan-500/25 blur-xl" />

        <div className="relative flex h-full w-full items-center justify-center">

          <svg
            viewBox="0 0 64 64"
            className="h-full w-full drop-shadow-[0_0_25px_rgba(34,211,238,.45)]"
            fill="none"
          >
            <defs>
              <linearGradient id="novaGradient" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            <path
              d="M32 5
                 L54 17
                 V42
                 L44 47
                 L44 57
                 L33 47
                 H12
                 V17
                 Z"
              stroke="url(#novaGradient)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            <text
              x="30"
              y="34"
              textAnchor="middle"
              fontSize="21"
              fontWeight="900"
              fill="#22d3ee"
            >
              N
            </text>
          </svg>

        </div>

      </div>

      {/* Text */}

      <div>

        <h1
          className={`
            ${titleSize}
            font-black
            leading-none
            tracking-tight
          `}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
            Nova
          </span>

          <span className="text-white">
            Chat
          </span>
        </h1>

        <p className="mt-2 text-[15px] tracking-wide text-slate-400">
          AI Powered Messaging Platform
        </p>

      </div>
    </motion.div>
  );
};

export default Logo;