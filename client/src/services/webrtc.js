//import Peer from "simple-peer";
import Peer from "simple-peer/simplepeer.min.js";

let peer = null;
let localStream = null;
let remoteStream = null;

// ===============================
// STUN Servers
// ===============================

const ICE_CONFIG = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};


// ===============================
// Microphone
// ===============================

export const getLocalStream = async (video = false) => {
   console.log("getLocalStream called. video =", video);
  console.log("Current localStream =", localStream);

  if (localStream) {
    console.log("Existing stream found");
    console.log("Tracks:", localStream.getTracks());

    const hasVideo = localStream.getVideoTracks().length > 0;

    if (hasVideo === video) {
      console.log("✅ Reusing existing stream");
      return localStream;
    }

    console.log("♻️ Recreating stream");
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
   console.log("Requesting camera...");
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video,
  });
 console.log("Camera acquired.");
  console.log("Local Stream:", localStream);
  console.log("Video Tracks:", localStream.getVideoTracks());
  console.log("Audio Tracks:", localStream.getAudioTracks());

  return localStream;
};
export const stopLocalStream = () => {
  if (!localStream) return;

  localStream.getTracks().forEach((track) => track.stop());

  localStream = null;
};
// ===============================
// Permission Check
// ===============================

export const hasMicrophone = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    return true;
  } catch {
    return false;
  }
};

// ===============================
// Create Peer
// ===============================

export const createPeer = ({
  initiator,
  stream,
  onSignal,
  onStream,
  onClose,
  onError,
}) => {
  if (peer) {
    peer.destroy();
    peer = null;
  }
  peer = new Peer({
    initiator,
    trickle: false,
    stream,
    config: ICE_CONFIG,
  });
  console.log(
  initiator
    ? "🟢 Caller Peer Created"
    : "🔵 Receiver Peer Created"
);

  // Send SDP + ICE
 peer.on("signal", (signal) => {
  console.log(
    initiator ? "🟢 CALLER SIGNAL:" : "🔵 RECEIVER SIGNAL:",
    signal.type || "ICE"
  );

  onSignal?.(signal);
});

  // Remote Audio
peer.on("stream", (stream) => {
  console.log("Remote Stream:", stream);

  console.log("Remote Video Tracks:", stream.getVideoTracks());
  console.log("Remote Audio Tracks:", stream.getAudioTracks());

  remoteStream = stream;
  onStream?.(stream);
});
  peer.on("connect", () => {
  console.log("Peer Connected");
});
  // Closed
  peer.on("close", () => {
  console.log("Peer Closed");
  remoteStream = null;
  onClose?.();
});

  // Error
  peer.on("error", (error) => {
  console.error("WebRTC Peer Error:", error);

    onError?.(error);
  });

  return peer;
};

export const createCallerPeer = ({
  stream,
  onSignal,
  onStream,
  onClose,
  onError,
}) => {

  return createPeer({
    initiator: true,
    stream,
    onSignal,
    onStream: (incomingStream) => {

      remoteStream = incomingStream;

      onStream?.(incomingStream);

    },
    onClose,
    onError,
  });

};

export const createReceiverPeer = ({
  stream,
  onSignal,
  onStream,
  onClose,
  onError,
}) => {

  return createPeer({
    initiator: false,
    stream,
    onSignal,
    onStream: (incomingStream) => {

      remoteStream = incomingStream;

      onStream?.(incomingStream);

    },
    onClose,
    onError,
  });

};
// ===============================
// Receive Signal
// ===============================

export const signalPeer = (signal) => {
  console.log("signalPeer() received:", signal.type);

  if (!peer) {
    console.error("❌ Peer is NULL");
    return;
  }

  if (!signal) {
    console.error("❌ Signal is NULL");
    return;
  }

  try {
    peer.signal(signal);
    console.log("✅ peer.signal() success");
  } catch (err) {
    console.error("❌ peer.signal() failed:", err);
  }
};

// ===============================
// Current Peer
// ===============================

export const getPeer = () => peer;

// ===============================
// Local Stream
// ===============================

export const getStream = () => localStream;
export const getRemoteStream = () => remoteStream;

// ===============================
// Mute
// ===============================

export const toggleMute = (mute) => {
  if (!localStream) return;

  localStream
    .getAudioTracks()
    .forEach((track) => {
      track.enabled = !mute;
    });
};

export const toggleCamera = (off) => {
  if (!localStream) return;

  localStream.getVideoTracks().forEach((track) => {
    track.enabled = !off;
  });
};

// ===============================
// Destroy
// ===============================

export const destroyPeer = () => {
  try {
    if (peer) {
      peer.destroy();
      peer = null;
    }
  } catch (err) {
    console.error("Error destroying peer:", err);
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }

  localStream = null;
  remoteStream = null;
};
