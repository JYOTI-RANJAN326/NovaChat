import { axiosInstance } from "./apiConnector";

export const getMessages = async (chatId) => {
  const response = await axiosInstance.get(
    `/message/${chatId}`
  );

  return response.data.messages;
};

export const sendMessage = async (
  chatId,
  content
) => {

  const response =
    await axiosInstance.post(
      "/message/send",
      {
        chatId,
        content,
      }
    );

  return response.data.message;

};