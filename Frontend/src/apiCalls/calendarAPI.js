import axios from "axios";
import { API_BASE_URL } from "./config";

const axiosy = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Create calendar event
export const createCalendarEvent = async (eventData) => {
  try {
    const response = await axiosy.post("/api/calendar", eventData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all calendar events
export const getCalendarEvents = async () => {
  try {
    const response = await axiosy.get("/api/calendar");
    return response.data.events;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update calendar event
export const updateCalendarEvent = async (id, eventData) => {
  try {
    const response = await axiosy.patch(`/api/calendar/${id}`, eventData);
    return response.data.event;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete calendar event
export const deleteCalendarEvent = async (id) => {
  try {
    const response = await axiosy.delete(`/api/calendar/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
