import { useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiPhoneOff,
} from "react-icons/fi";

import { toggleMute } from "../../services/webrtc";

const CallScreen = ({
  remoteUser,
  remoteAudioRef,
  onEnd,
}) => {
  const [muted, setMuted] = useState(false);

  const handleMute = () => {
    const next = !muted;

    setMuted(next);

    toggleMute(next);
  };

  const userName =
    remoteUser?.receiverName ||
    remoteUser?.callerName ||
    "Unknown User";

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-[#0B1324]
      "
    >
      {/* Hidden Remote Audio */}

      <audio
        ref={remoteAudioRef}
        autoPlay
      />

      <div
        className="
          w-[420px]
          rounded-3xl
          bg-[#111C2F]
          p-8
          text-center
          shadow-2xl
        "
      >
        {/* Avatar */}

        <div
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
            to-blue-600
            text-5xl
            font-bold
            text-white
          "
        >
          {userName.charAt(0).toUpperCase()}
        </div>

        {/* Name */}

        <h2 className="mt-6 text-3xl font-bold text-white">
          {userName}
        </h2>

        <p className="mt-2 text-slate-400">
          Voice Call
        </p>

        {/* Buttons */}

        <div className="mt-10 flex justify-center gap-8">

          {/* Mute */}

          <button
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
              transition
              hover:bg-cyan-600
            "
          >
            {muted ? (
              <FiMicOff size={28} />
            ) : (
              <FiMic size={28} />
            )}
          </button>

          {/* End */}

          <button
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
              transition
              hover:bg-red-600
            "
          >
            <FiPhoneOff size={28} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default CallScreen;