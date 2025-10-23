import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const Profilerouter = express.Router();

Profilerouter.get("/", isAuth, getProfile);
Profilerouter.put("/", isAuth, updateProfile);

export default Profilerouter;
