import cron from "node-cron";
import { prisma } from '../models/prisma.js';
import { sendEmail } from './email-service.js';
import { generateMessage } from '../lib/llm.js';
import { InteractionService } from './interaction-service.js';
import { UserService } from './user-service.js';

const interactionService = new InteractionService();
const userService = new UserService();

export function initializeScheduler() {
  cron.schedule("0 */6 * * *", async () => {
    console.log("[cron] checking users and listings");
    const inactiveUsers = await userService.findInactiveUsers(7);
    for (const u of inactiveUsers) {
      const msg = await generateMessage({ purpose: "Re-engagement: ayudar a volver a la plataforma", context: { user: u }});
      await sendEmail(u.email, msg.subject, `${msg.body}\n\n${msg.cta}`);
      await interactionService.createReengagementInteraction(u.id);
    }

    const listings = await prisma.listing.findMany();
    for (const l of listings) {
      if (l.visits > 100) {
        const newPrice = Math.round(l.price * 1.10);
        const owner = await userService.getUserById(l.ownerId);
        const subject = "Sugerencia: ajustar precio de tu anuncio";
        const body = `Tu anuncio "${l.title}" tiene ${l.visits} visitas. Sugerimos aumentar precio a ${newPrice}. ¿Aplicar?`;
        await sendEmail(owner.email, subject, `${body}\n\nAplicar: [En la plataforma]`);
        await interactionService.createPriceSuggestionInteraction(l.id, newPrice);
      }
    }
  });
}