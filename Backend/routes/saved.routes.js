import express from 'express';
import {
  createSavedContent,
  getSavedContent,
  deleteSavedContent
} from '../controllers/saved.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const savedRouter = express.Router();

// Protect all saved routes
savedRouter.use(isAuth);

savedRouter.post('/', createSavedContent);
savedRouter.get('/', getSavedContent); // Supports ?type=idea|script|seo
savedRouter.delete('/:id', deleteSavedContent);

export default savedRouter;