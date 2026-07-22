import { axiosInstance } from "./apiConnector";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getArchivedChats = async () => {
  const response = await axiosInstance.get(
    `${BASE_URL}/chats/archived`
  );

  return response.data;
};

export const toggleArchiveChat = async (chatId) => {
  const response = await axiosInstance.patch(
    `${BASE_URL}/chats/${chatId}/archive`,
    {}
  );

  return response.data;
};