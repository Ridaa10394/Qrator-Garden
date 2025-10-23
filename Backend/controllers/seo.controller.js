import SEO from "../models/seo.model.js";
import { generateSEOWithGemini, generateHashtagsWithGemini } from "../config/gemini.js";

// Utility to safely parse JSON strings for generated SEO content
const tryParseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str; // Return the string if parsing fails
    }
}

// Generate SEO Content with Gemini (Does NOT save to DB)
export const generateSEO = async (req, res) => {
    const { contentTitle, platform, targetKeywords } = req.body;

    try {
        if (!contentTitle) {
            return res.status(400).json({ message: "Content title is required" });
        }

        // Generate hashtags only (ignore title/description/keywords)
        const hashtags = await generateHashtagsWithGemini(contentTitle, platform, targetKeywords);

        return res.status(200).json({
            message: "Hashtags generated successfully",
            generatedSEOData: hashtags
        });
    } catch (error) {
        console.error("Error generating hashtags via SEO endpoint:", error);
        return res.status(500).json({ message: "Failed to generate hashtags", error: error.message });
    }
};

// Save Generated SEO Content to DB
export const saveSEO = async (req, res) => {
    const { contentTitle, generatedSEOData, ideaId, metadata } = req.body;
    const userId = req.userId;

    try {
        if (!contentTitle || !generatedSEOData) {
            return res.status(400).json({ message: "Title and SEO data are required for saving" });
        }

        const newSavedSEO = await SEO.create({
            userId,
            contentTitle,
            // Convert the object structure to a JSON string before saving
            generatedSEOData: typeof generatedSEOData === 'object' ? JSON.stringify(generatedSEOData) : generatedSEOData, 
            ideaId: ideaId || null,
            metadata: metadata || {}
        });

        return res.status(201).json({ 
            message: "SEO strategy saved successfully", 
            savedSEO: newSavedSEO 
        });
    } catch (error) {
        console.error("Error saving SEO:", error);
        return res.status(500).json({ message: "Failed to save SEO strategy", error: error.message });
    }
};

// Get all saved SEO content for the user
export const getSavedSEOs = async (req, res) => {
    const userId = req.userId;

    try {
        const savedSEOs = await SEO.find({ userId }).sort({ createdAt: -1 }).lean();

        // Process generatedSEOData field to parse JSON back into an object
        const processedItems = savedSEOs.map(item => {
            item.generatedSEOData = tryParseJson(item.generatedSEOData);
            return item;
        });

        return res.status(200).json({ savedSEOs: processedItems });
    } catch (error) {
        console.error("Error fetching saved SEOs:", error);
        return res.status(500).json({ message: "Failed to fetch saved SEO content" });
    }
};

// Delete saved SEO content
export const deleteSEO = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const seo = await SEO.findOneAndDelete({ _id: id, userId });

        if (!seo) {
            return res.status(404).json({ message: "SEO content not found" });
        }

        return res.status(200).json({ message: "SEO content deleted successfully" });
    } catch (error) {
        console.error("Error deleting SEO content:", error);
        return res.status(500).json({ message: "Failed to delete SEO content" });
    }
};

// Generate hashtags-only (does not save)
export const generateHashtags = async (req, res) => {
    const { contentTitle, platform, targetKeywords } = req.body;
    try {
        if (!contentTitle) {
            return res.status(400).json({ message: "Content title is required for hashtag generation" });
        }

        const hashtags = await generateHashtagsWithGemini(contentTitle, platform, targetKeywords);

        return res.status(200).json({ message: "Hashtags generated successfully", hashtags });
    } catch (error) {
        console.error("Error generating hashtags:", error);
        return res.status(500).json({ message: "Failed to generate hashtags", error: error.message });
    }
};