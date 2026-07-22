import axios from "axios";
//import { apiConnector } from "./apiConnector";

const BASE_URL = "http://localhost:5000/api/v1/chats";

const axiosConfig = {
  withCredentials: true,
};

// =======================
// Personal Chats
// =======================

export const getMyChats = async () => {
  const response = await axios.get(
    BASE_URL,
    axiosConfig
  );

  return response.data;
};

export const createChat = async (receiverId) => {
  const response = await axios.post(
    BASE_URL,
    { receiverId },
    axiosConfig
  );

  return response.data;
};

export const searchChats = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search?query=${query}`,
    axiosConfig
  );

  return response.data;
};




// =======================
// Group Chats
// =======================

export const createGroupChat = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/group`,
    data,
    axiosConfig
  );

  return response.data;
};

export const renameGroup = async (
  groupId,
  chatName
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/rename`,
    { chatName },
    axiosConfig
  );

  return response.data;
};

export const addMember = async (
  groupId,
  userId
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/add-member`,
    {
      participants: [userId],
    },
    axiosConfig
  );

  return response.data;
};
export const removeMember = async (
  groupId,
  userId
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/remove-member`,
    { userId },
    axiosConfig
  );

  return response.data;
};

export const makeAdmin = async (
  groupId,
  userId
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/make-admin`,
    { userId },
    axiosConfig
  );

  return response.data;
};

export const removeAdmin = async (
  groupId,
  userId
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/remove-admin`,
    { userId },
    axiosConfig
  );

  return response.data;
};

export const leaveGroup = async (
  groupId
) => {
  const response = await axios.patch(
    `${BASE_URL}/group/${groupId}/leave`,
    {},
    axiosConfig
  );

  return response.data;
};

// =======================
// Chat Actions
// =======================

export const togglePinChat = async (chatId) => {
  const response = await axios.patch(
    `${BASE_URL}/${chatId}/pin`,
    {},
    axiosConfig
  );

  return response.data;
};

export const toggleMuteChat = async (chatId) => {
  const response = await axios.patch(
    `${BASE_URL}/${chatId}/mute`,
    {},
    axiosConfig
  );

  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await axios.delete(
    `${BASE_URL}/${chatId}`,
    axiosConfig
  );

  return response.data;
};