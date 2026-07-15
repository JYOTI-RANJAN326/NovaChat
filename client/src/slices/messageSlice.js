import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },

    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setLoading,
} = messageSlice.actions;

export default messageSlice.reducer;