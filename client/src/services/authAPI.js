import toast from "react-hot-toast";

import { axiosInstance } from "./apiConnector";

import {
  setLoading,
  setToken,
} from "../slices/authSlice";

import {
  setUser,
} from "../slices/userSlice";

import { socket } from "./socket";

export const login = async (
  data,
  dispatch,
  navigate
) => {

  try {

    dispatch(setLoading(true));

    const response =
      await axiosInstance.post(
        "/auth/login",
        data
      );

    if (!response.data.success) {
      throw new Error();
    }

    dispatch(
      setToken(response.data.token)
    );

    dispatch(
      setUser(response.data.user)
    );

    localStorage.setItem(
      "token",
      JSON.stringify(response.data.token)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    socket.connect();

    socket.emit(
      "setup",
      response.data.user._id
    );

    toast.success("Login Successful");

    navigate("/chat");

  } catch (error) {

    toast.error(
      error?.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    dispatch(setLoading(false));

  }

};