import express from 'express';
import {
  generateIdeas,
  createIdea,
  getAllIdeas,
  updateIdeaStage,
  deleteIdea
} from '../controllers/idea.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const Idearouter = express.Router();

// Protect all idea routes
Idearouter.use(isAuth);

Idearouter.post("/generate", generateIdeas);
Idearouter.get('/getideas', getAllIdeas);
Idearouter.post('/createidea', createIdea);
Idearouter.patch('/:id/stage', updateIdeaStage);
Idearouter.delete('/:id', deleteIdea);

export default Idearouter;
