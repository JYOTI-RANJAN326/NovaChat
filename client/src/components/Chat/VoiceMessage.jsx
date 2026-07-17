import { useRef, useState } from "react";
import {
  FiPlay,
  FiPause,
} from "react-icons/fi";

const VoiceMessage = ({ url, duration = 0 }) => {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] =
    useState(0);
    const [speed, setSpeed] =
  useState(1);

 const togglePlay = () => {
  if (!audioRef.current) return;

  audioRef.current.playbackRate = speed;

  if (playing) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setPlaying(!playing);
};

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="
        mt-3
        flex
        items-center
        gap-3
        rounded-2xl
        bg-black/20
        px-4
        py-3
      "
    >
      <audio
        ref={audioRef}
        src={url}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onTimeUpdate={() =>
          setCurrentTime(
            audioRef.current.currentTime
          )
        }
      />

      <button
        onClick={togglePlay}
       className="
flex
h-11
w-11
items-center
justify-center
rounded-full
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
shadow-lg
"
      >
        {playing ? (
          <FiPause />
        ) : (
          <FiPlay />
        )}
      </button>

      <div className="flex-1">

        <input
  type="range"
  min={0}
  max={
    audioRef.current?.duration ||
    duration
  }
  value={currentTime}
  onChange={(e) => {

    audioRef.current.currentTime =
      e.target.value;

    setCurrentTime(
      Number(e.target.value)
    );

  }}
  className="
    h-1.5
    w-full
    cursor-pointer
    accent-cyan-400
  "
/>

<div className="mt-2 flex items-center justify-between text-xs text-slate-400">

  <span>
    {formatTime(currentTime)}
  </span>

  <button
    onClick={() => {

      const next =
        speed === 1
          ? 1.5
          : speed === 1.5
          ? 2
          : 1;

      setSpeed(next);

      if (audioRef.current) {
        audioRef.current.playbackRate =
          next;
      }

    }}
    className="
      rounded-lg
      bg-cyan-500/20
      px-2
      py-1
      text-cyan-300
    "
  >
    {speed}x
  </button>

  <span>
    {formatTime(
      audioRef.current?.duration ||
      duration
    )}
  </span>

</div>
    </div> 

    </div>
  )
         
    
};

export default VoiceMessage;