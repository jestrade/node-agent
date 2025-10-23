import express from 'express';
import { prisma } from '../models/prisma.js';

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ ok: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: String(err) });
    }
});

export default router;