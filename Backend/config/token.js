import jwt from "jsonwebtoken";

// Function to generate JWT token
export const genToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};