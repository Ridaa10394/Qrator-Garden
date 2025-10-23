import axios from "axios";
import { API_BASE_URL } from "./config"; // your base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies for auth
});

// Fetch logged-in user's profile
export const getProfile = async () => {
  try {
    const res = await axiosInstance.get("/api/profile");
    return res.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const res = await axiosInstance.put("/api/profile", profileData);
    return res.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
