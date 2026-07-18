import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({
  onGoogleLogin,
  loading = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Divider */}

      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />

        <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          Or Continue With
        </span>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
      </div>

      {/* Google */}

      <motion.button
        whileHover={{
          scale: 1.015,
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        type="button"
        disabled={loading}
        onClick={onGoogleLogin}
        className="
          group
          relative
          flex
          h-[40px]
          w-full
          items-center
          justify-center
          gap-4
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-400/30
          hover:bg-white/[0.06]
          hover:shadow-[0_0_30px_rgba(34,211,238,.12)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {/* Glow */}

        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute left-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div
          className="
            relative
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white
          "
        >
          <FcGoogle className="text-lg" />
        </div>

        <span className="relative z-10 text-[15px] font-semibold tracking-wide text-white transition group-hover:text-cyan-300">
          Continue with Google
        </span>
      </motion.button>
    </div>
  );
};

export default SocialLogin;