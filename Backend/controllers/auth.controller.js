import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";
//Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    //Validate User Data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Validate email
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Password Strength
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await User.create({ name, email, password :hashedPassword });
    
    //Generate Token and cookie
    const token = await genToken(newUser._id);
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:true,
      maxAge: 30*24*60*60*1000,
    })
    return res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error(error); // Add this line for debugging
}
}

//Login Controller
export const login = async (req, res) => {
  const {email, password } = req.body;
  try {

    //check if Username and Password is provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Validate Username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email does not exist" });
    }

    //Compare Password
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
      return res.status(400).json({message:"Incorrect Password"})
    }
    //Generate Token and cookie
    const token = await genToken(user._id);
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:true,
      maxAge: 30*24*60*60*1000,
    })
    res.status(200).json({user})

  } catch (error) {
    console.error(error); // Add this line for debugging
}
}