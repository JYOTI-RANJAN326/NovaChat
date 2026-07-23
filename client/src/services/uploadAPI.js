



import axios from "axios";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
 
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/upload`,
    formData,
    {
      withCredentials: true,
    }
  );

  console.log("UPLOAD API RESPONSE:", response.data);

  return response.data;
};