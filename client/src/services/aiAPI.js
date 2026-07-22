import { axiosInstance } from "./apiConnector";

// ================= AI Chat =================

export const askAI = async (messages) => {
  return axiosInstance.post("/ai/chat", {
    messages,
  });
};

export const getChatHistory = async () => {
  return axiosInstance.get("/ai/history");
};

export const clearChatHistory = async () => {
  return axiosInstance.delete("/ai/history");
};

// ================= Code Reviewer =================

export const codeChat = async (data) => {
  return axiosInstance.post("/ai/code-chat", data);
};