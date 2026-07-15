import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },

    logout(state) {
      state.token = null;
    },
  },
});

export const {
  setLoading,
  setToken,
  logout,
} = authSlice.actions;

export default authSlice.reducer;