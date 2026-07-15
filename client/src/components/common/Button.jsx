import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

function Button({
  children,
  loading = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="
      w-full
      rounded-2xl
      py-4
      text-xl
      font-semibold
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      shadow-[0_0_35px_rgba(6,182,212,.35)]
      transition-all
      "
      {...props}
    >
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex items-center justify-center gap-3">

          {children}

          <HiArrowRight size={22} />

        </div>
      )}
    </motion.button>
  );
}

export default Button;