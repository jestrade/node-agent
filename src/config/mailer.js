import nodemailer from 'nodemailer';
import { config } from './index.js';

const mailerOptions = {
  service: 'gmail',
  host: config.email.host,
  port: Number(config.email.port),
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
};

export const transporter = nodemailer.createTransport(mailerOptions);