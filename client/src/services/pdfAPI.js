import { axiosInstance } from "./apiConnector";

// Upload PDF
export const uploadPDF = async (formData) => {
  return axiosInstance.post("/pdf/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Chat with uploaded PDF
export const pdfChat = async (data) => {
  return axiosInstance.post("/pdf/chat", data);
};