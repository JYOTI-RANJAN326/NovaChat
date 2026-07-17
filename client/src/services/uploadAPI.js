import axios from "axios";

export const uploadFile = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};