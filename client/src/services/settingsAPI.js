import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

const config = {
  withCredentials: true,
};

export const getProfile = async () => {
  const res = await axios.get(
    `${BASE_URL}/me`,
    config
  );

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.patch(
    `${BASE_URL}/profile`,
    data,
    config
  );

  return res.data;
};

export const changePassword = async (data) => {
  const res = await axios.patch(
    `${BASE_URL}/password`,
    data,
    config
  );

  return res.data;
};

export const updateSettings = async (settings) => {
  const res = await axios.patch(
    `${BASE_URL}/settings`,
    {
      settings,
    },
    config
  );

  return res.data;
};

export const updateAvatar = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const res = await axios.patch(
    `${BASE_URL}/avatar`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};