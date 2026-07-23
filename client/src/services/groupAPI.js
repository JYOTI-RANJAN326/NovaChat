import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/groups`;

// Create Group
export const createGroup = async (chatName, participants) => {
  const res = await axios.post(
    BASE_URL,
    {
      chatName,
      participants,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// Get My Groups
export const getAllGroups = async () => {
  const res = await axios.get(BASE_URL, {
    withCredentials: true,
  });

  return res.data;
};