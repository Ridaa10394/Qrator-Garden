import CalendarEvent from "../models/calendar.model.js";

// Create a calendar event
export const createCalendarEvent = async (req, res) => {
    const { title, date, time, details, colorStage } = req.body;
    const userId = req.userId;

    try {
        if (!title || !date) {
            return res.status(400).json({ message: "Title and date are required" });
        }

        const newEvent = await CalendarEvent.create({
            userId,
            title,
            date: new Date(date),
            time: time || "",
            details: details || "",
            colorStage: colorStage || 0,
        });

        return res.status(201).json({ 
            message: "Event created successfully", 
            event: newEvent 
        });
    } catch (error) {
        console.error("Error creating calendar event:", error);
        return res.status(500).json({ message: "Failed to create event" });
    }
};

// Get all calendar events for a user
export const getCalendarEvents = async (req, res) => {
    const userId = req.userId;

    try {
        const events = await CalendarEvent.find({ userId }).sort({ date: 1 });
        return res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return res.status(500).json({ message: "Failed to fetch events" });
    }
};

// Update a calendar event
export const updateCalendarEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, time, details, colorStage } = req.body;
    const userId = req.userId;

    try {
        const event = await CalendarEvent.findOne({ _id: id, userId });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (title) event.title = title;
        if (date) event.date = new Date(date);
        if (time !== undefined) event.time = time;
        if (details !== undefined) event.details = details;
        if (colorStage !== undefined) event.colorStage = colorStage;

        await event.save();

        return res.status(200).json({ message: "Event updated", event });
    } catch (error) {
        console.error("Error updating calendar event:", error);
        return res.status(500).json({ message: "Failed to update event" });
    }
};

// Delete a calendar event
export const deleteCalendarEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const event = await CalendarEvent.findOneAndDelete({ _id: id, userId });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        return res.status(500).json({ message: "Failed to delete event" });
    }
};
