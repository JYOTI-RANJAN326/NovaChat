import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/upload`;

export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(BASE_URL, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};