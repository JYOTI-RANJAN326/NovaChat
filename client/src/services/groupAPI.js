import axios from "axios";

export const getAllUsers = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/v1/users",
    {
      withCredentials: true,
    }
  );
export const createGroup = async (chatName, participants) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/groups",
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
  return res.data.users;
};