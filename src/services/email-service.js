import { transporter } from '../config/mailer.js';
import { prisma } from '../models/prisma.js';
import { config } from '../config/index.js';

export async function sendEmail(to, subject, body) {
  try {
    await transporter.sendMail({
      from: config.email.emailFrom,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });
  } catch (err) {
    console.error(err);
  }
  await prisma.interaction.create({ 
    data: { 
      type: "email_sent", 
      payload: { subject, body }, 
      user: { connect: { email: to } } 
    } 
  }).catch(()=>{});
}