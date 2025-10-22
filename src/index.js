import express from "express";
import dotenv from "dotenv";
import webhookRouter from './routes/webhook.js';
import { initializeScheduler } from './services/scheduler.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(webhookRouter);
initializeScheduler();

const PORT = process.env.HTTP_PORT;
app.listen(PORT, () => console.log(`Listening ${PORT}`));