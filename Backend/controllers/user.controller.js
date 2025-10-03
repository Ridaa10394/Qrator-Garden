
import User from "../models/user.model.js";

//Get Current User Controller
export const getCurrentUser = async (req, res) => {
  const userid = req.userId;
  try {
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};