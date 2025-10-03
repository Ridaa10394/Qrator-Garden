import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);

export default authRouter;