import { useState } from "react";
import {
  FiMic,
  FiSquare,
} from "react-icons/fi";
import { ReactMediaRecorder } from "react-media-recorder";

const VoiceRecorder = ({
  onRecordingComplete,
}) => {
  const [recording, setRecording] =
    useState(false);

  return (
    <ReactMediaRecorder
      audio
      onStop={(blobUrl, blob) => {
        setRecording(false);

        onRecordingComplete(blob);
      }}
      render={({
        startRecording,
        stopRecording,
      }) => (
        <>
          {!recording ? (
            <button
              type="button"
              onClick={() => {
                setRecording(true);
                startRecording();
              }}
              className="
                rounded-xl
                p-2
                text-slate-400
                transition
                hover:bg-white/5
                hover:text-cyan-400
              "
            >
              <FiMic className="text-2xl" />
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="
                rounded-xl
                p-2
                text-red-400
                transition
                animate-pulse
              "
            >
              <FiSquare className="text-2xl" />
            </button>
          )}
        </>
      )}
    />
  );
};

export default VoiceRecorder;