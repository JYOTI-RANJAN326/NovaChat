import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const replySlice = createSlice({
  name: "reply",

  initialState,

  reducers: {
    setReply(state, action) {
      state.message = action.payload;
    },

    clearReply(state) {
      state.message = null;
    },
  },
});

export const {
  setReply,
  clearReply,
} = replySlice.actions;

export default replySlice.reducer;