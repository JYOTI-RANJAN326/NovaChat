import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingCall: null,
  outgoingCall: null,
  inCall: false,
  remoteUser: null,
  callStatus: "idle", // idle | calling | ringing | connected
};

const callSlice = createSlice({
  name: "call",

  initialState,

  reducers: {

   setIncomingCall: (state, action) => {
  state.incomingCall = action.payload;
  state.callStatus = "ringing";
},

    clearIncomingCall: (state) => {
      state.incomingCall = null;
    },

  setOutgoingCall: (state, action) => {
  state.outgoingCall = action.payload;
  state.callStatus = "calling";
},

    clearOutgoingCall: (state) => {
      state.outgoingCall = null;
    },

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
} = callSlice.actions;

export default callSlice.reducer;