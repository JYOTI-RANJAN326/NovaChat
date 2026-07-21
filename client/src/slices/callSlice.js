import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Incoming & outgoing calls
  incomingCall: null,
  outgoingCall: null,

  // Call state
  inCall: false,
  remoteUser: null,
  callStatus: "idle", // idle | calling | ringing | connected

  // Audio / Video
  callType: "audio", // audio | video

  // WebRTC Streams
  localStream: null,
  remoteStream: null,

  // Controls
  isMuted: false,
  isCameraOff: false,
};

const callSlice = createSlice({
  name: "call",

  initialState,

  reducers: {
    // ============================
    // Incoming Call
    // ============================

    setIncomingCall: (state, action) => {
      state.incomingCall = action.payload;
      state.callStatus = "ringing";
    },

    clearIncomingCall: (state) => {
      state.incomingCall = null;
    },

    // ============================
    // Outgoing Call
    // ============================

    setOutgoingCall: (state, action) => {
      state.outgoingCall = action.payload;
      state.callStatus = "calling";
    },

    clearOutgoingCall: (state) => {
      state.outgoingCall = null;
    },

    // ============================
    // Connected Call
    // ============================

    startCall: (state, action) => {
      state.inCall = true;
      state.remoteUser = action.payload;
      state.callStatus = "connected";
    },

    endCall: (state) => {
      state.inCall = false;

      state.remoteUser = null;

      state.incomingCall = null;
      state.outgoingCall = null;

      state.callStatus = "idle";

      state.localStream = null;
      state.remoteStream = null;

      state.isMuted = false;
      state.isCameraOff = false;

      state.callType = "audio";
    },

    // ============================
    // WebRTC Streams
    // ============================

    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },

    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },

    // ============================
    // Call Controls
    // ============================

    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },

    toggleCamera: (state) => {
      state.isCameraOff = !state.isCameraOff;
    },

    setCallType: (state, action) => {
      state.callType = action.payload;
    },
  },
});

export const {
  setIncomingCall,
  clearIncomingCall,
  setOutgoingCall,
  clearOutgoingCall,
  startCall,
  endCall,
  setLocalStream,
  setRemoteStream,
  toggleMute,
  toggleCamera,
  setCallType,
} = callSlice.actions;

export default callSlice.reducer;