// scriptsAPI.js
import axios from "axios";
import { API_BASE_URL } from "./config"; // Assuming './config' contains API_BASE_URL

const axiosy = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // to send cookies with requests
});


// Generate script based on provided parameters
export const generateScript = async (title, contentType, duration, keyPoints) => {
  try {
    const response = await axiosy.post("/api/script/generate", {
      title,
      contentType,
      duration: parseInt(duration), // Ensure duration is sent as a number if possible
      keyPoints: keyPoints.split('\n').filter(p => p.trim() !== ''), // Convert string to array of points
    });
    return response.data.generatedScript;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Save generated script to the database
export const saveScript = async (contentTitle, generatedScript, metadata, ideaId = null) => {
  try {
    const response = await axiosy.post("/api/script/save", {
      contentTitle,
      generatedScript,
      metadata,
      ideaId,
    });
    return response.data.savedScript;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all saved scripts for the user
export const getSavedScripts = async () => {
  try {
    const response = await axiosy.get("/api/script/saved");
    return response.data.savedScripts;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a saved script by ID
export const deleteScript = async (id) => {
  try {
    const response = await axiosy.delete(`/api/script/saved/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};