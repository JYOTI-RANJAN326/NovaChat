import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/groups";

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