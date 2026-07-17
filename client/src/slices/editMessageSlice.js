import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const editMessageSlice = createSlice({
  name: "editMessage",

  initialState,

  reducers: {
    setEditMessage(state, action) {
      state.message = action.payload;
    },

    clearEditMessage(state) {
      state.message = null;
    },
  },
});

export const {
  setEditMessage,
  clearEditMessage,
} = editMessageSlice.actions;

export default editMessageSlice.reducer;