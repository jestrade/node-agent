import express from "express";
import dotenv from "dotenv";
import webhookRouter from './routes/webhook.js';
import userRouter from './routes/user-routes.js';
import interactionRouter from './routes/interaction-routes.js';
import { config } from "../config/index.js";

dotenv.config();

export const initializeApi = () => {
    const app = express();
    app.use(express.json());
    app.use(userRouter);
    app.use(webhookRouter);
    app.use(interactionRouter);

    const port = config.httpServer.port;
    app.listen(port, () => console.log(`Listening ${port}`));
}


