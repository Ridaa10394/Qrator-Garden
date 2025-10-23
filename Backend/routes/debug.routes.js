import express from 'express';
import { whoami } from '../controllers/debug.controller.js';

const router = express.Router();

// No auth here - used solely for debugging network/cookie/header behavior
router.get('/whoami', whoami);

export default router;
