import axios from "axios";
import { axiosInstance } from "./apiConnector";
const BASE_URL = "http://localhost:5000/api/v1/messages";

export const getMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `/messages/${chatId}`
    );

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      alert("Request timed out.");
    } else {
      console.error(error);
    }

    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/messages",
      data
    );

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      alert("Request timed out. Please try again.");
    } else {
      console.error(error);
    }

    throw error; // Important: let the caller handle it too
  }
};

export const markSeen = async (chatId) => {
  const response = await axiosInstance.patch(
    `${BASE_URL}/${chatId}/seen`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};
export const toggleReaction = async (
  messageId,
  emoji
) => {
  const response = await axiosInstance.patch(
    
    `/messages/${messageId}/toggle-reaction`,
    {
      emoji,
    }
  );

  return response.data;
};



export const editMessage = async (
  messageId,
  text
) => {
  const response = await axiosInstance.patch(
  `/messages/${messageId}`,
  {
    text,
  }
);

  return response.data;
};

export const deleteForMe = async (messageId) => {
  const response = await axiosInstance.patch(
  `/messages/${messageId}/delete-for-me`
);

  return response.data;
};

export const deleteForEveryone = async (messageId) => {
 const response = await axiosInstance.patch(
  `/messages/${messageId}/delete-for-everyone`
);

  return response.data;
};

export const toggleStarMessage = async (messageId) => {
  const response = await axiosInstance.patch(
  `/messages/${messageId}/star`
);

  return response.data;
};

export const togglePinMessage = async (messageId) => {
  const response = await axiosInstance.patch(
    `/messages/${messageId}/pin`
  );

  return response.data;
};