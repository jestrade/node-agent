import { GoogleGenAI } from '@google/genai';
import { config } from "../config/index.js";

const GEMINI_API_KEY = config.llm.gemini.apiKey;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function generateMessage({ purpose, context }) {
  const systemPrompt = `
        You are a concise, persuasive, and helpful marketing copy assistant.
        Always return a JSON object in this exact format:
        {
          "subject": "string",
          "body": "string",
          "cta": "string"
        }

        Guidelines:
        - Write short, natural, and professional English.
        - Use a friendly but confident tone.
        - Avoid long introductions or redundant phrases.
          `;
  const userPrompt = `
    Objective: ${purpose}
    Context: ${JSON.stringify(context, null, 2)}
    `;

  try {
    const result = await ai.models.generateContent({
      model: config.llm.gemini.model,
      contents: [systemPrompt, userPrompt],
    });

    const text = result.text;

    const jsonString = text.replace(/```json\s*|\s*```/g, '').trim();
    const data = JSON.parse(jsonString);

    return data;
  } catch (error) {
    console.error("❌ Error generating message with Gemini:", error);
    
    return { 
      subject: "Important Update", 
      body: "We have an important update regarding our services. Please check your account for more details.", 
      cta: "View" 
    };
  }
}