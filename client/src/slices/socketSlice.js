import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
  typingUsers: [],
  notifications: [],
  lastSeen: {}, // userId -> timestamp
};

const socketSlice = createSlice({
  name: "socket",

  initialState,

  reducers: {
    // ===========================
    // Online Users
    // ===========================
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // ===========================
    // Typing Users
    // ===========================
    addTypingUser: (state, action) => {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },

    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter(
        (id) => id !== action.payload
      );
    },

    // ===========================
    // Notifications
    // ===========================
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    // ===========================
    // Last Seen
    // ===========================
    updateLastSeen: (state, action) => {
      const { userId, time } = action.payload;

      state.lastSeen[userId] = time;
    },
  },
});

export const {
  setOnlineUsers,
  addTypingUser,
  removeTypingUser,
  addNotification,
  clearNotifications,
  updateLastSeen,
} = socketSlice.actions;

export default socketSlice.reducer;