import Idea from "../models/idea.model.js";
import { generateIdeasWithGemini } from "../config/gemini.js";

// Generate Ideas with Gemini
export const generateIdeas = async (req, res) => {
  const { topic, audience } = req.body;
  const userId = req.userId;

  try {
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // Generate 5 ideas using Gemini
    const generatedIdeas = await generateIdeasWithGemini(topic, audience);

    return res.status(201).json({
      message: "Ideas generated successfully",
      generatedIdeas: generatedIdeas, // Raw ideas for immediate display
    });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return res
      .status(500)
      .json({ message: "Failed to generate ideas", error: error.message });
  }
};

// Get all user ideas
// Get all user ideas (now filtered by status)
export const getAllIdeas = async (req, res) => {
  const userId = req.userId;
  // Extract status from query parameters (e.g., ?status=planted)
  const { status } = req.query;

  try {
    const filter = { userId };
    if (status && (status === "saved" || status === "planted")) {
      filter.status = status;
    } else {
      filter.status = "planted";
    }

    const ideas = await Idea.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ ideas });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return res.status(500).json({ message: "Failed to fetch ideas" });
  }
};

// Create a manual idea
// Create a manual idea (Now sets status to 'planted')
export const createIdea = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newIdea = await Idea.create({
      userId,
      title,
      description: description || "A fresh seed waiting to be developed",
      currentStage: 0,
      status: "planted", // <-- SET STATUS TO PLANTED HERE
    });

    return res
      .status(201)
      .json({ message: "Idea created successfully", idea: newIdea });
  } catch (error) {
    console.error("Error creating idea:", error);
    return res.status(500).json({ message: "Failed to create idea" });
  }
};

// Update idea stage
export const updateIdeaStage = async (req, res) => {
  const { id } = req.params;
  const { currentStage } = req.body;
  const userId = req.userId;

  try {
    if (currentStage < 0 || currentStage > 4) {
      return res.status(400).json({ message: "Invalid stage value" });
    }

    const idea = await Idea.findOne({ _id: id, userId });

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    idea.currentStage = currentStage;
    await idea.save();

    return res.status(200).json({ message: "Idea stage updated", idea });
  } catch (error) {
    console.error("Error updating idea stage:", error);
    return res.status(500).json({ message: "Failed to update idea stage" });
  }
};

// Delete idea
export const deleteIdea = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const idea = await Idea.findOneAndDelete({ _id: id, userId });

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    return res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error);
    return res.status(500).json({ message: "Failed to delete idea" });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  const userId = req.userId;

  try {
    const totalIdeas = await Idea.countDocuments({ userId });
    const sprouting = await Idea.countDocuments({
      userId,
      currentStage: { $gte: 1 },
    });
    const blooming = await Idea.countDocuments({
      userId,
      currentStage: { $gte: 3 },
    });
    const harvested = await Idea.countDocuments({ userId, currentStage: 4 });

    return res.status(200).json({
      stats: {
        totalIdeas,
        sprouting,
        blooming,
        harvested,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({ message: "Failed to fetch statistics" });
  }
};
