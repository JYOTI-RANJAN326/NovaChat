import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },

  },
});

export const {
  setLoading,
  setUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;