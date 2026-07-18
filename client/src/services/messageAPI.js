import axios from "axios";
import { axiosInstance } from "./apiConnector";
const BASE_URL = "http://localhost:5000/api/v1/messages";

export const getMessages = async (chatId) => {
  const response = await axios.get(
    `${BASE_URL}/${chatId}`,
    {
      withCredentials: true,
    }
  )

  return response.data;
};

export const sendMessage = async (data) => {
  const response = await axios.post(
    BASE_URL,
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const markSeen = async (chatId) => {
  const response = await axios.patch(
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