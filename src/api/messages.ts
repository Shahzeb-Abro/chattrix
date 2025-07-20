import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getMyMessages = async (id: string) => {
  try {
    console.log("Id in api request", id);
    const response = await axios.get(`${baseUrl}/messages/${id}`, {
      withCredentials: true,
    });
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/messages/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
