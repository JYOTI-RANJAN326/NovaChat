import { useEffect, useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiPhoneOff,
  FiVideo,
  FiVideoOff,
  FiVolume2,
} from "react-icons/fi";
import { motion } from "framer-motion";

import {
  toggleMute,
  toggleCamera,
} from "../../services/webrtc";

const CallScreen = ({
  remoteUser,
  remoteAudioRef,
  onEnd,
  callType = "audio",
}) => {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [duration, setDuration] = useState(0);

  const isVideoCall = callType === "video";

  const userName =
    remoteUser?.receiverName ||
    remoteUser?.callerName ||
    "Unknown User";

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  const handleMute = () => {
    const next = !muted;
    setMuted(next);
    toggleMute(next);
  };

  const handleCamera = () => {
    const next = !cameraOff;
    setCameraOff(next);
    toggleCamera(next);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-[#08111F]
      "
    >
      <audio
        ref={remoteAudioRef}
        autoPlay
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          w-[430px]
          rounded-3xl
          border
          border-cyan-500/20
          bg-[#111C2F]
          p-8
          text-center
          shadow-[0_0_40px_rgba(34,211,238,.15)]
        "
      >
        {/* Avatar */}

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            mx-auto
            flex
            h-32
            w-32
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
          {userName.charAt(0).toUpperCase()}
        </motion.div>

        <h2 className="mt-7 text-3xl font-bold text-white">
          {userName}
        </h2>

        <p className="mt-2 text-cyan-300">
          {isVideoCall ? "Video Call" : "Voice Call"}
        </p>

        <p className="mt-1 text-slate-400">
          {formatTime(duration)}
        </p>

        {/* Controls */}

        <div className="mt-10 flex justify-center gap-5">
          {/* Mute */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleMute}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              text-white
            "
          >
            {muted ? (
              <FiMicOff size={28} />
            ) : (
              <FiMic size={28} />
            )}
          </motion.button>

          {/* Camera */}

          {isVideoCall && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleCamera}
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-slate-700
                text-white
              "
            >
              {cameraOff ? (
                <FiVideoOff size={28} />
              ) : (
                <FiVideo size={28} />
              )}
            </motion.button>
          )}

          {/* Speaker Placeholder */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-slate-700
              text-white
            "
          >
            <FiVolume2 size={28} />
          </motion.button>

          {/* End Call */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onEnd}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-white
            "
          >
            <FiPhoneOff size={28} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CallScreen;