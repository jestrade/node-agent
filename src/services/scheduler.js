import cron from "node-cron";
import { prisma } from '../models/prisma.js';
import { sendEmail } from './email.js';
import { generateMessage } from '../lib/llm.js';

export function initializeScheduler() {
  cron.schedule("0 */6 * * *", async () => {
    console.log("[cron] checking users and listings");
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const inactiveUsers = await prisma.user.findMany({ where: { lastActiveAt: { lt: sevenDaysAgo } }});
    for (const u of inactiveUsers) {
      const msg = await generateMessage({ purpose: "Re-engagement: ayudar a volver a la plataforma", context: { user: u }});
      await sendEmail(u.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      await prisma.interaction.create({ data: { type: "reengagement_sent", userId: u.id }});
    }

    const listings = await prisma.listing.findMany();
    for (const l of listings) {
      if (l.visits > 100) {
        const newPrice = Math.round(l.price * 1.10);
        const owner = await prisma.user.findUnique({ where: { id: l.ownerId }});
        const subject = "Sugerencia: ajustar precio de tu anuncio";
        const body = `Tu anuncio "${l.title}" tiene ${l.visits} visitas. Sugerimos aumentar precio a ${newPrice}. ¿Aplicar?`;
        await sendEmail(owner.email, subject, `${body}\n\nAplicar: [En la plataforma]`);
        await prisma.interaction.create({ data: { type: "price_suggestion", listingId: l.id, payload: { suggestion: newPrice } }});
      }
    }
  });
}