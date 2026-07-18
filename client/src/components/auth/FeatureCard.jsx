import { motion } from "framer-motion";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:border-cyan-400/30
        hover:bg-white/[0.06]
        hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Icon */}
      <div
        className="
          relative
          z-10
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-cyan-400/15
          bg-gradient-to-br
          from-cyan-500/15
          via-sky-500/10
          to-blue-600/15
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:border-cyan-400/30
        "
      >
        <Icon className="text-[26px] text-cyan-400" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h3 className="text-[17px] font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;