import { transporter } from "../config/mailer.js";
import { prisma } from "../models/prisma.js";
import { config } from "../config/index.js";
import InteractionService from "./interaction-service.js";

export async function sendEmail(to, subject, body) {
  try {
    await transporter.sendMail({
      from: config.email.emailFrom,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });

    const interactionService = new InteractionService();
    await interactionService.createInteraction("email_sent", {
      to,
      subject,
      body,
    });
  } catch (err) {
    console.error(err);
  }
}
