import Peer from "simple-peer";

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

export const getLocalStream = async () => {
  if (localStream) return localStream;

  localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  return localStream;
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
  peer = new Peer({
    initiator,
    trickle: false,
    stream,
    config: ICE_CONFIG,
  });

  // Send SDP + ICE
  peer.on("signal", (signal) => {
    onSignal?.(signal);
  });

  // Remote Audio
  peer.on("stream", (remoteStream) => {
    onStream?.(remoteStream);
  });

  // Closed
  peer.on("close", () => {
    onClose?.();
  });

  // Error
  peer.on("error", (error) => {
    console.log("Peer Error:", error);

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
  if (!peer) return;

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

// ===============================
// Destroy
// ===============================

export const destroyPeer = () => {
  if (peer) {
    peer.destroy();
    peer = null;
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      track.stop();
    });

   localStream = null;
remoteStream = null;
  }
};