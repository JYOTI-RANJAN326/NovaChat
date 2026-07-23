import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

const axiosConfig = {
  withCredentials: true,
};

export const searchUsers = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search?query=${query}`,
    axiosConfig
  );

  return response.data;
};