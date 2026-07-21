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
  remoteVideoRef,
  localVideoRef,
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
    bg-black
    overflow-hidden
  "
>
  {/* Audio */}
  <audio
    ref={remoteAudioRef}
    autoPlay
  />

  {/* Remote Video */}
  {isVideoCall && (
    <video
      ref={remoteVideoRef}
      autoPlay
      playsInline
      className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        bg-black
      "
    />
  )}

  {/* Local Preview */}
  {isVideoCall && (
    <video
      ref={localVideoRef}
      autoPlay
      muted
      playsInline
      className="
        absolute
        bottom-6
        right-6
        h-52
        w-40
        rounded-2xl
        border-2
        border-cyan-400
        object-cover
        bg-black
        shadow-2xl
        z-20
      "
    />
  )}

  
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`
  ${
    isVideoCall
      ? "absolute bottom-0 left-0 right-0 rounded-t-3xl"
      : "w-[430px] rounded-3xl"
  }
  border
  border-cyan-500/20
  bg-[#111C2F]/70
  backdrop-blur-xl
  p-8
  text-center
  shadow-[0_0_40px_rgba(34,211,238,.15)]
`}
      >
        {/* Avatar */}

      {!isVideoCall && (
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
      )}

      {/* Name margin */}
       <h2 className={`${isVideoCall ? "mt-2" : "mt-7"} text-3xl font-bold text-white`}>
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