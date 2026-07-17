import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "../slices/socketSlice";
import authReducer from "../slices/authSlice";
import replyReducer from "../slices/replySlice";
import editMessageReducer from "../slices/editMessageSlice";
import callReducer from "../slices/callSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    reply: replyReducer,
    editMessage: editMessageReducer,
    socket: socketReducer,
    call: callReducer,
  },
});