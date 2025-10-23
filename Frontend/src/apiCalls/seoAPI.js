import axios from "axios";
import { API_BASE_URL } from "./config"; 

const axiosy = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // to send cookies with requests
});


export const generateSEO = async (contentTitle, platform, targetKeywords, contentDescription) => {
  try {
    const response = await axiosy.post("/api/seo/generate", {
      contentTitle,
      platform,
      targetKeywords,
      contentDescription,
    });
    return response.data.generatedSEOData;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const saveSEO = async (contentTitle, generatedSEOData, metadata, ideaId = null) => {
  try {
    const response = await axiosy.post("/api/seo/save", {
      contentTitle,
      generatedSEOData, 
      metadata,
      ideaId,
    });
    return response.data.savedSEO;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getSavedSEOs = async () => {
  try {
    const response = await axiosy.get("/api/seo/saved");
    return response.data.savedSEOs;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const deleteSEO = async (id) => {
  try {
    const response = await axiosy.delete(`/api/seo/saved/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const generateHashtags = async (contentTitle, platform, targetKeywords) => {
  try {
    const response = await axiosy.post('/api/seo/hashtags', { contentTitle, platform, targetKeywords });
    return response.data.hashtags;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};