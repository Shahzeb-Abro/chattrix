import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getMyMessages = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/messages/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
