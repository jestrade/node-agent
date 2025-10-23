import dotenv from 'dotenv';

dotenv.config();

export const config = {
    email: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        emailFrom: process.env.EMAIL_FROM,
    },
    httpServer: {
        port: Number(process.env.HTTP_PORT) || 3000,
    },
    llm: {
        openAi : {
            apiKey: process.env.OPENAI_API_KEY,
            model: process.env.OPENAI_MODEL
        },
        gemini: {
            apiKey: process.env.GEMINI_API_KEY,
            model: process.env.GEMINI_MODEL
        }
    },
}

