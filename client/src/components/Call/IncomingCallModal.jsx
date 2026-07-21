import { motion } from "framer-motion";
import {
  FiPhone,
  FiPhoneCall,
  FiPhoneOff,
  FiVideo,
} from "react-icons/fi";

const IncomingCallModal = ({
  caller,
  onAccept,
  onReject,
}) => {
  const isVideoCall =
    caller?.callType === "video";

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
      "
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          w-[390px]
          rounded-3xl
          border
          border-cyan-500/20
          bg-[#0F172A]
          p-8
          text-center
          shadow-[0_0_40px_rgba(34,211,238,.15)]
        "
      >
        {/* Animated Avatar */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
          className="
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500
            via-sky-500
            to-blue-600
            text-5xl
            font-bold
            text-white
            shadow-[0_0_35px_rgba(34,211,238,.35)]
          "
        >
          {caller?.callerName?.charAt(0)?.toUpperCase()}
        </motion.div>

        <h2
          className="
            mt-7
            text-2xl
            font-bold
            text-white
          "
        >
          {caller?.callerName}
        </h2>

        <p className="mt-2 text-slate-400">
          Incoming {isVideoCall ? "Video" : "Voice"} Call
        </p>

        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
          }}
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            text-cyan-300
          "
        >
          {isVideoCall ? (
            <FiVideo />
          ) : (
            <FiPhoneCall />
          )}

          <span>Ringing...</span>
        </motion.div>

        <div
          className="
            mt-10
            flex
            justify-center
            gap-8
          "
        >
          {/* Reject */}

          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={onReject}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-white
              shadow-lg
            "
          >
            <FiPhoneOff size={26} />
          </motion.button>

          {/* Accept */}

          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={onAccept}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-emerald-500
              text-white
              shadow-lg
            "
          >
            {isVideoCall ? (
              <FiVideo size={26} />
            ) : (
              <FiPhone size={26} />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default IncomingCallModal;