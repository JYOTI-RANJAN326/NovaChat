import { motion } from "framer-motion";

function GlassCard({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
      relative
      max-w-[610px]
      w-full
      
      rounded-[36px]
      border
      border-cyan-400/20
      bg-[#0E1426]/80
      p-12 xl:p-14
      backdrop-blur-2xl
      shadow-[0_0_40px_rgba(6,182,212,.15)]
      "
    >
      {/* Glow Border */}
      <div
        className="
        pointer-events-none
        absolute
        inset-0
        rounded-[36px]
        border
        border-cyan-400/10
        shadow-[0_0_45px_rgba(6,182,212,.15)]
        "
      />

      {children}
    </motion.div>
  );
}

export default GlassCard;