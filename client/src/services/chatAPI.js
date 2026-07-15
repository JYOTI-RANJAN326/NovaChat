import { axiosInstance } from "./apiConnector";

export const getChats = async () => {
  const response = await axiosInstance.get("/chat");

  return response.data.chats;
};