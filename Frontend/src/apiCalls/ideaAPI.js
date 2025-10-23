import axios from "axios";
import { API_BASE_URL } from "./config";

// Axios Instance
const axiosy = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // to send cookies with requests
});

// Generate ideas based on topic and audience
export const generateIdeas = async (topic, audience) => {
  try {
    const response = await axiosy.post("/api/ideas/generate", { topic, audience });
    return response.data.generatedIdeas || []; // array of ideas
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all ideas for the logged-in user
export const getIdeas = async () => {
  try {
    const response = await axiosy.get("/api/ideas/getideas");
    return response.data.ideas;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new idea (save to backend)
export const createIdea = async (idea) => {
  try {
    const response = await axiosy.post("/api/ideas/createidea", {
      title: idea.title,
      description: idea.description,
    });
    return response.data.idea;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update idea stage
export const updateIdeaStage = async (id, currentStage) => {
  try {
    const response = await axiosy.patch(`/api/ideas/${id}/stage`, { currentStage });
    return response.data.idea;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an idea
export const deleteIdea = async (id) => {
  try {
    const response = await axiosy.delete(`/api/ideas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get user statistics
export const getUserStats = async () => {
  try {
    const response = await axiosy.get("/api/ideas/stats");
    return response.data.stats;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
