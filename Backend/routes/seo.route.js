import express from 'express';
import {
    generateSEO,
    saveSEO,
    getSavedSEOs,
    deleteSEO,
} from '../controllers/seo.controller.js';
import { generateHashtags } from '../controllers/seo.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const SEORouter = express.Router();

// Protect all SEO routes
SEORouter.use(isAuth);

SEORouter.post("/generate", generateSEO);
SEORouter.post('/hashtags', generateHashtags);
SEORouter.post("/save", saveSEO);
SEORouter.get("/saved", getSavedSEOs);
SEORouter.delete("/saved/:id", deleteSEO);

export default SEORouter;