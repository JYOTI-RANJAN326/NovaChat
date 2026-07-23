import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const signupAPI = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/signup`,
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const loginAPI = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getCurrentUserAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/me`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};