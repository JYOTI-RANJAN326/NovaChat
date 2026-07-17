import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/users";

export const searchUsers = async (query) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/search?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};