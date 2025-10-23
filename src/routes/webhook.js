import express from 'express';
import { prisma } from '../models/prisma.js';
import { sendEmail } from '../services/email.js';
import { generateMessage } from '../lib/llm.js';

const router = express.Router();

router.post("/webhook", async (req, res) => {
  const { type, payload } = req.body;
  try {
    if (type === "user.created") {
      const u = await prisma.user.upsert({
        where: { email: payload.email },
        update: { lastActiveAt: new Date() },
        create: { email: payload.email, name: payload.name }
      });
      const msg = await generateMessage({ purpose: "Help publish the first listing", context: { user: u } });
      await sendEmail(u.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      await prisma.interaction.create({ data: { type: "user_created", userId: u.id, payload } });
    }

    if (type === "listing.created") {
      const l = await prisma.listing.create({ data: { id: payload.id, ownerId: payload.ownerId, title: payload.title, price: payload.price, description: payload.description || "" }});
      await prisma.interaction.create({ data: { type: "listing_created", listingId: l.id, payload }});
      if (!payload.description || (payload.photos?.length || 0) < 3) {
        const owner = await prisma.user.findUnique({ where: { id: payload.ownerId }});
        const msg = await generateMessage({ purpose: "Suggest improving description and photos", context: { user: owner, listing: l }});
        await sendEmail(owner.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      }
    }

    if (type === "listing.view") {
      await prisma.listing.update({ where: { id: payload.listingId }, data: { visits: { increment: 1 } }});
      const l = await prisma.listing.findUnique({ where: { id: payload.listingId }});
      if (l.visits >= 50 && l.visits % 50 === 0) {
        const owner = await prisma.user.findUnique({ where: { id: l.ownerId }});
        const msg = await generateMessage({ purpose: "Suggest upgrade to Pro due to strong traction", context: { user: owner, listing: l }});
        await sendEmail(owner.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
        await prisma.interaction.create({ data: { type: "upgrade_suggestion", listingId: l.id, userId: owner.id }});
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

export default router;