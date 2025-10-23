import express from "express";
import dotenv from "dotenv";
import webhookRouter from './routes/webhook.js';
import userRouter from './routes/user.js';
import interactionRouter from './routes/interaction.js';
import { initializeScheduler } from './services/scheduler.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(webhookRouter);
app.use(interactionRouter);
initializeScheduler();

const PORT = process.env.HTTP_PORT;
app.listen(PORT, () => console.log(`Listening ${PORT}`));