import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
