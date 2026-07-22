import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/users";

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