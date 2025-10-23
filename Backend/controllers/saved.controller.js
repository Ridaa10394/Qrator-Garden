import SavedContent from "../models/saved.model.js";

// Create saved content
export const createSavedContent = async (req, res) => {
    const { type, title, content } = req.body;
    const userId = req.userId;

    try {
        if (!type || !title || !content) {
            return res.status(400).json({ message: "Type, title, and content are required" });
        }

        if (!['idea', 'script', 'seo'].includes(type)) {
            return res.status(400).json({ message: "Invalid content type" });
        }

        const newSaved = await SavedContent.create({
            userId,
            type,
            title,
            content,
        });

        return res.status(201).json({ 
            message: "Content saved successfully", 
            saved: newSaved 
        });
    } catch (error) {
        console.error("Error saving content:", error);
        return res.status(500).json({ message: "Failed to save content" });
    }
};

// Get all saved content for a user
export const getSavedContent = async (req, res) => {
    const userId = req.userId;
    const { type } = req.query; // Optional filter by type

    try {
        const filter = { userId };
        if (type && ['idea', 'script', 'seo'].includes(type)) {
            filter.type = type;
        }

        const savedContent = await SavedContent.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ savedContent });
    } catch (error) {
        console.error("Error fetching saved content:", error);
        return res.status(500).json({ message: "Failed to fetch saved content" });
    }
};

// Delete saved content
export const deleteSavedContent = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const saved = await SavedContent.findOneAndDelete({ _id: id, userId });

        if (!saved) {
            return res.status(404).json({ message: "Saved content not found" });
        }

        return res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        console.error("Error deleting saved content:", error);
        return res.status(500).json({ message: "Failed to delete content" });
    }
};