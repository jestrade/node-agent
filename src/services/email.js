import { transporter } from '../config/mailer.js';
import { prisma } from '../models/prisma.js';

export async function sendEmail(to, subject, body) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
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