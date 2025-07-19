import axios from "axios";
import {
  type ForgotPasswordSchema,
  type LoginSchema,
  type ResetPasswordSchema,
  type SignUpSchema,
} from "../lib/validations";

const baseUrl = import.meta.env.VITE_API_URL;

export const registerUser = async (data: SignUpSchema) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (data: LoginSchema) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgotPassword = async (data: ForgotPasswordSchema) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/forgot-password`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (
  data: ResetPasswordSchema & { token: string }
) => {
  try {
    const { token } = data;
    const response = await axios.post(
      `${baseUrl}/auth/reset-password/${token}`,
      {
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/auth/me`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
