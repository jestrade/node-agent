import express from 'express';
import { prisma } from '../models/prisma.js';

const router = express.Router();

router.get("/interactions", async (req, res) => {
    try {
        const interactions = await prisma.interaction.findMany();
        res.json({ ok: true, interactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: String(err) });
    }
});

export default router;