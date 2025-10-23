import express from 'express';
import {
    generateScript,
    saveScript,
    getSavedScripts,
    deleteScript
} from '../controllers/script.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const ScriptRouter = express.Router();

// Protect all script routes
ScriptRouter.use(isAuth);

// Content Generation (Does not save to DB)
ScriptRouter.post("/generate", generateScript);
ScriptRouter.post("/save", saveScript);
ScriptRouter.get("/saved", getSavedScripts);
ScriptRouter.delete("/saved/:id", deleteScript);

export default ScriptRouter;