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
        x: 8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onClick={onClick}
      className={`
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
              border-cyan-500/30
              bg-gradient-to-r
              from-cyan-500/20
              via-cyan-500/10
              to-blue-500/20
              shadow-[0_0_25px_rgba(34,211,238,0.18)]
            `
            : `
              border-transparent
              hover:border-white/10
              hover:bg-white/5
            `
        }
      `}
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            scale: active ? 1.1 : 1,
            rotate: active ? 3 : 0,
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
                ? "bg-cyan-500/15 text-cyan-300"
                : "bg-white/5 text-slate-400"
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
                  : "text-slate-300"
              }
            `}
          >
            {title}
          </span>

          {active && (
            <span className="text-xs text-cyan-300">
              Active
            </span>
          )}
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="
              flex
              h-6
              min-w-[24px]
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              px-2
              text-xs
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
              shadow-[0_0_12px_rgba(34,211,238,0.9)]
            "
          />
        )}
      </div>

      {/* Active Left Bar */}

      {active && (
        <motion.div
          layoutId="activeSidebar"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="
            absolute
            left-0
            top-3
            h-10
            w-1
            rounded-r-full
            bg-cyan-400
          "
        />
      )}

      {/* Hover Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />
    </motion.button>
  );
};

export default SidebarItem;