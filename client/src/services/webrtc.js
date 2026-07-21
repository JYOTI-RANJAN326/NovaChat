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
  if (localStream) return localStream;

  localStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video,
  });

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

  // Send SDP + ICE
  peer.on("signal", (signal) => {
  console.log("Generated Signal:", signal.type || "ICE");
  onSignal?.(signal);
});

  // Remote Audio
  peer.on("stream", (stream) => {
      console.log("Remote stream:", stream.id);
  console.log("Remote stream received");
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
  if (!peer || !signal) return;

  peer.signal(signal);
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
