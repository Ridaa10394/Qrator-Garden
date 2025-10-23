import axios from "axios";
import { API_BASE_URL } from "./config";

const axiosy = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Create saved content
export const createSavedContent = async (contentData) => {
  try {
    const response = await axiosy.post("/api/saved", contentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all saved content (with optional type filter)
export const getSavedContent = async (type = null) => {
  try {
    const url = type ? `/api/saved?type=${type}` : "/api/saved";
    const response = await axiosy.get(url);
    return response.data.savedContent;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete saved content
export const deleteSavedContent = async (id) => {
  try {
    const response = await axiosy.delete(`/api/saved/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};