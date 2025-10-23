import Script from "../models/script.model.js";
import { generateScriptWithGemini } from "../config/gemini.js";

// Generate Script with Gemini (Does NOT save to DB)
export const generateScript = async (req, res) => {
    const { title, contentType, duration, keyPoints } = req.body;

    try {
        if (!title || !contentType || !duration) {
            return res.status(400).json({ message: "Title, content type, and duration are required" });
        }

        const generatedScript = await generateScriptWithGemini(title, contentType, duration, keyPoints);

        return res.status(200).json({
            message: "Script generated successfully",
            generatedScript: generatedScript // Raw script for immediate display
        });
    } catch (error) {
        console.error("Error generating script:", error);
        return res.status(500).json({ message: "Failed to generate script", error: error.message });
    }
};

// Save Generated Script to DB
export const saveScript = async (req, res) => {
    const { contentTitle, generatedScript, ideaId, metadata } = req.body;
    const userId = req.userId;

    try {
        if (!contentTitle || !generatedScript) {
            return res.status(400).json({ message: "Title and script content are required for saving" });
        }

        const newSavedScript = await Script.create({
            userId,
            contentTitle,
            generatedScript,
            ideaId: ideaId || null,
            metadata: metadata || {}
        });

        return res.status(201).json({ 
            message: "Script saved successfully", 
            savedScript: newSavedScript 
        });
    } catch (error) {
        console.error("Error saving script:", error);
        return res.status(500).json({ message: "Failed to save script", error: error.message });
    }
};

// Get all saved scripts for the user
export const getSavedScripts = async (req, res) => {
    const userId = req.userId;

    try {
        const savedScripts = await Script.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ savedScripts });
    } catch (error) {
        console.error("Error fetching saved scripts:", error);
        return res.status(500).json({ message: "Failed to fetch saved scripts" });
    }
};

// Delete saved script
export const deleteScript = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const script = await Script.findOneAndDelete({ _id: id, userId });

        if (!script) {
            return res.status(404).json({ message: "Script not found" });
        }

        return res.status(200).json({ message: "Script deleted successfully" });
    } catch (error) {
        console.error("Error deleting script:", error);
        return res.status(500).json({ message: "Failed to delete script" });
    }
};