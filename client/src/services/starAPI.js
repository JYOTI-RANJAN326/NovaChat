import axios from "axios";

const BASE_URL =
  `${import.meta.env.VITE_BASE_URL}/messages`;

const axiosConfig = {
  withCredentials: true,
};

export const toggleStarMessage = async (messageId) => {
  const response = await axios.patch(
    `${BASE_URL}/${messageId}/star`,
    {},
    axiosConfig
  );

  return response.data;
};

export const getStarredMessages = async () => {
  const response = await axios.get(
    `${BASE_URL}/starred`,
    axiosConfig
  );

  return response.data;
};