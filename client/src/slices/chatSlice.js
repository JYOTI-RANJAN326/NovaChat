import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedChat: null,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },

    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setChats,
  setSelectedChat,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer;