import { motion } from "framer-motion";

const SidebarItem = ({
  icon: Icon,
  title,
  active = false,
  badge,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{
        x: 6,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
      }}
      onClick={onClick}
      className={`
        group
        relative
        flex
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        border
        px-4
        py-3.5
        transition-all
        duration-300
        ${
          active
            ? `
              border-cyan-400/30
              bg-gradient-to-r
              from-cyan-500/15
              via-sky-500/10
              to-blue-500/15
              shadow-[0_0_25px_rgba(34,211,238,.18)]
            `
            : `
              border-transparent
              bg-transparent
              hover:border-white/10
              hover:bg-white/5
            `
        }
      `}
    >
      {/* Hover Background */}

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Left */}

      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          animate={{
            scale: active ? 1.08 : 1,
            rotate: active ? 5 : 0,
          }}
          transition={{ duration: 0.25 }}
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            transition-all
            ${
              active
                ? `
                  bg-gradient-to-br
                  from-cyan-400
                  via-sky-500
                  to-blue-600
                  text-white
                  shadow-[0_0_18px_rgba(34,211,238,.35)]
                `
                : `
                  bg-white/5
                  text-slate-400
                  group-hover:bg-white/10
                  group-hover:text-cyan-300
                `
            }
          `}
        >
          <Icon className="text-xl" />
        </motion.div>

        <div className="flex flex-col items-start">
          <span
            className={`
              text-[15px]
              font-semibold
              transition-colors
              ${
                active
                  ? "text-white"
                  : "text-slate-300 group-hover:text-white"
              }
            `}
          >
            {title}
          </span>

          <span
            className={`
              text-xs
              ${
                active
                  ? "text-cyan-300"
                  : "text-slate-500 group-hover:text-slate-400"
              }
            `}
          >
            {active ? "Currently Active" : "Open Section"}
          </span>
        </div>
      </div>

      {/* Right */}

      <div className="relative z-10 flex items-center gap-3">
        {badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="
              flex
              min-w-[26px]
              h-6
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-2
              text-[11px]
              font-bold
              text-white
              shadow-lg
            "
          >
            {badge}
          </motion.div>
        )}

        {active && (
          <motion.div
            layoutId="activeDot"
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-cyan-400
              shadow-[0_0_14px_rgba(34,211,238,.9)]
            "
          />
        )}
      </div>

      {/* Active Left Bar */}

      {active && (
        <motion.div
          layoutId="sidebarActiveBar"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
          className="
            absolute
            left-0
            top-3
            h-10
            w-1
            rounded-r-full
            bg-gradient-to-b
            from-cyan-300
            to-blue-500
            shadow-[0_0_12px_rgba(34,211,238,.8)]
          "
        />
      )}
    </motion.button>
  );
};

export default SidebarItem;