import express from 'express';
import { getInteractions } from '../controllers/interaction-controller.js';

const router = express.Router();

router.get("/interactions", getInteractions);

export default router;