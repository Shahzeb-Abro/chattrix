import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/messages`;

export const getMyMessages = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const markAsRead = async (id: string) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/mark-as-read/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
